import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

const Repository = () => {
  const navigate = useNavigate();

  let { owner, repoName } = useParams();
  const [repoDetails, setRepoDetails] = useState();
  const getRepoInfo = async () => {
    try {
      const data = await api.get(`/repos/${owner}/${repoName}`);
      if (data) {
        setRepoDetails(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (owner && repoName) {
      getRepoInfo();
    }
  }, [owner, repoName]);

  return (
    <>
      <div className="container">
        <button className="btn-go_back mt-3" onClick={() => navigate("/")}>
          Go Back
        </button>{" "}
        <div className="repository-detail mt-2 d-flex flex-column align-items-center justify-content-center">
          {" "}
          <div className="title-sub text-center mb-1">Details</div>
          <div className="inner-details">
            <img src={repoDetails?.owner?.avatar_url} alt="avatar" />
            <div className="details">
              <span>Owner:</span>
              <a
                target="_blank"
                rel="noreferrer"
                href={repoDetails?.owner?.html_url}
              >
                <span>{repoDetails?.owner?.login}</span>
              </a>
            </div>
            <div className="details">
              <span>Repository Name:</span>
              <a target="_blank" rel="noreferrer" href={repoDetails?.html_url}>
                <span>{repoDetails?.name}</span>
              </a>
            </div>
            <div className="details">
              <span>Open Issues:</span>
              <span>{repoDetails?.open_issues}</span>
            </div>
            <div className="details">
              <span>Default Branch:</span>
              <span>{repoDetails?.default_branch}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repository;
