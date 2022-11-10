import React from "react";

import { BsEyeFill } from "react-icons/bs";
import { BiGitRepoForked } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const RepositoryInfo = ({
  index,
  repoName,
  author,
  stars,
  watchers,
  forks,
  description,
  lastUpdate,
}) => {
  return (
    <Link to={`repository/${author}/${repoName}`}>
      <div className="repo-box">
        <div className="repo-name">
          {repoName ? repoName.substring(0, 20) : ""}
        </div>
        <div className="repo-owner">
          <span>Owner:</span> <span>{author}</span>
        </div>
        <div className="repo-owner">
          <BsEyeFill /> <span>{watchers}</span>
        </div>

        <div className="repo-owner">
          <BiGitRepoForked />
          <span>{forks}</span>
        </div>
        <div className="repo-owner">
          <AiOutlineStar />
          <span>{stars}</span>
        </div>
        <div className="repo-owner">
          <span>Description:</span>
          <span>{description ? description.substring(0, 20) : ""}</span>
        </div>
        <div className="repo-owner">
          <span>Last Update:</span>
          <span>{lastUpdate}</span>
        </div>
      </div>
    </Link>
  );
};

export default RepositoryInfo;
