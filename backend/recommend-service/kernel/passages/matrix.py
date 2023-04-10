from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
  from models.user import User
from kernel.algorithm.similarity import get_inner_product_similarity_score
from utils.database import db


def matrixF(user: User, top: int = 10) -> list[tuple[str, int]]:
    jobs_score: list[tuple[str, int]] = list()
    all_job = list(map(lambda id: db.get_job(id), db.get_all_job_ids()))
    for job in all_job:
        score = get_inner_product_similarity_score(
            user.embedding, job.embedding
        )
        jobs_score.append((job.id, score))
    return sorted(jobs_score, key=lambda x: x[1], reverse=True)[:top]
