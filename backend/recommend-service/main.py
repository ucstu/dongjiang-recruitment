from fastapi import FastAPI, Depends
from models.user import User
from utils.database import db
from kernel.cronJobs import job, user, matrix
from kernel.passages.itemcf import itemCF
from kernel.passages.usercf import userCF
from kernel.passages.matrix import matrixF
from kernel.sortings.mmr import mmr
import uvicorn
import time
import os


# 注意不要改变任意 recompute 的顺序
def _recompute_parameters():
    db.start_cache()
    print("start recompute parameters")
    start_time = time.time()
    user.recompute_job_like_scores()  # 重新计算职位喜欢分数
    print("recompute job like scores cost: ", time.time() - start_time)
    start_time = time.time()
    job.recompute_user_like_scores()  # 重新计算用户喜欢分数
    print("recompute user like scores cost: ", time.time() - start_time)
    start_time = time.time()
    user.recompute_user_similar_scores()  # 重新计算用户相似度
    print("recompute user similar scores cost: ", time.time() - start_time)
    start_time = time.time()
    job.recompute_job_similar_scores()  # 重新计算职位相似度
    print("recompute job similar scores cost: ", time.time() - start_time)
    start_time = time.time()
    matrix.recompute_matrix_factorization_model()  # 重新计算 embedding
    print("recompute matrix factorization model cost: ", time.time() - start_time)
    db.clear_recommend_cache()
    db.stop_cache()


# 判断环境变量是否为定时任务模式
if os.environ.get("IS_CRON", "false") == "true":
    _recompute_parameters()
    exit(0)


app = FastAPI()


@app.get("/recommend/recompute")
def recompute_parameters():
    _recompute_parameters()
    return {"msg": "success"}


@app.get("/recommend/positions")
def get_recommend_jobs(id: str):
    cache = db.get_recommend_cache(id)
    if cache is not None:
        return cache
    user = db.get_user(id)
    # 根据用户的历史行为召回候选职位
    item_cf_jobs = itemCF(user, 40, 5)
    user_cf_jobs = userCF(user, 40, 5)
    # matrix_f_jobs = matrixF(user, 200)
    # 对召回结果进行和并后去重
    recommend_jobs = dict()
    for job_id, score in item_cf_jobs:
        if recommend_jobs.get(job_id) is None:
            recommend_jobs[job_id] = (job_id, score)
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id][1] = score
    for job_id, score in user_cf_jobs:
        if recommend_jobs.get(job_id) is None:
            recommend_jobs[job_id] = (job_id, score)
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id][1] = score
    # for job_id, score in matrix_f_jobs:
    #     if job_id not in add_job_ids:
    #         add_job_ids.add(job_id)
    #         recommend_jobs[job_id] = (job_id, score)
    #     else:
    #         if score > recommend_jobs[job_id][1]:
    #             recommend_jobs[job_id][1] = score
    # 对数据进行多样性重排
    # recommend_jobs = mmr(recommend_jobs.items(), 20)
    recommend_jobs_list = list(recommend_jobs.values())
    db.set_recommend_cache(id, recommend_jobs_list)
    return recommend_jobs_list


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
