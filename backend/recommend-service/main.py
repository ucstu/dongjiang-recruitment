import json
from urllib import request
from fastapi import FastAPI
import yaml
from utils.database import db
from kernel.cronJobs import job, user
from kernel.passages.itemcf import itemCF
from kernel.passages.usercf import userCF
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
    db.clear_recommend_cache()
    db.stop_cache()


# 判断环境变量是否为定时任务模式
if os.environ.get("IS_CRON", "false") == "true":
    _recompute_parameters()
    exit(0)


config = yaml.load(
    open("/etc/dongjiang-recruitment/config.yaml"),
    Loader=yaml.FullLoader
)

API_BASE_URL = config["service"]["baseUrl"]

app = FastAPI()


@app.get("/recommend/recompute_parameters")
def recompute_parameters():
    _recompute_parameters()
    return {"msg": "success"}


def _send_recommend_message(body):
    req = request.Request(
        url=API_BASE_URL + "/common/sendRecommend",
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    request.urlopen(req)


@app.get("/recommend/send_recommend_message")
def send_recommend_message():
    user_ids = db.get_all_user_ids()
    for user_id in user_ids:
        recommend_job = get_recommend_jobs(user_id)
        if recommend_job is not None and len(recommend_job) > 0:
            _send_recommend_message({
                "userId": user_id,
                "positionId": recommend_job[0][0],
            })
    return {"msg": "success"}


@app.get("/recommend/get_recommend_jobs")
def get_recommend_jobs(id: str):
    cache = db.get_recommend_cache(id)
    if cache is not None:
        return cache
    user = db.get_user(id)
    if user is None:
        return list()
    # 根据用户的历史行为召回候选职位
    item_cf_jobs = itemCF(user, 100, 20)
    user_cf_jobs = userCF(user, 100, 20)
    # matrix_f_jobs = matrixF(user, 200)
    # 对召回结果进行和并后去重
    recommend_jobs = dict()
    for job_id, score in item_cf_jobs:
        if user.get_job_like_score(job_id) is not None:
            continue
        if not job_id in recommend_jobs:
            recommend_jobs[job_id] = (job_id, score)
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id][1] = score
    for job_id, score in user_cf_jobs:
        if user.get_job_like_score(job_id) is not None:
            continue
        if not job_id in recommend_jobs:
            recommend_jobs[job_id] = (job_id, score)
        else:
            if score > recommend_jobs[job_id][1]:
                recommend_jobs[job_id][1] = score
    # 对数据进行多样性重排
    # recommend_jobs = mmr(recommend_jobs.items(), 20)
    recommend_jobs_list = list(recommend_jobs.values())
    db.set_recommend_cache(id, recommend_jobs_list)
    return recommend_jobs_list


if __name__ == "__main__":
    uvicorn.run("__main__:app", host="0.0.0.0", port=8000, reload=True)
