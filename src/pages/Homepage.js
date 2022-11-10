import React, { useState, useEffect, useMemo } from "react";
import { BsSearch } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import debouce from "lodash.debounce";
import RepositoryInfo from "../components/RepositoryBox";
import api from "../services/api";
import Pagination from "react-js-pagination";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [repositoryData, setRepositoryData] = useState();
  const [repoName, setRepoName] = useState("");
  const [perpageItem, setperpageItem] = useState(10);
  const [sortType, setsortType] = useState("stars");
  const [sortOrder, setsortOrder] = useState("asc");

  const [activepage, setActivePage] = useState(1);
  const [errorMessage, setErrorMessage] = useState();
  const getRepositories = async () => {
    setErrorMessage();

    try {
      setLoading(true);
      const data = await api.get(
        `/search/repositories?q=${repoName}&sort=${sortType}&order=${sortOrder}&per_page=${perpageItem}&page=${activepage}`
      );
      if (data && data.items.length) {
        setRepositoryData(data);
      } else if (data.items.length === 0) {
        setRepositoryData();
        setErrorMessage("No matching results found");
      }
      setLoading(false);
    } catch (error) {
      setRepositoryData();
      setLoading(false);

      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    if (repoName) {
      getRepositories();
    } else {
      setRepositoryData();
    }
  }, [sortOrder, sortType, perpageItem, activepage]);
  useEffect(() => {
    // debounce function
    const getRepos = setTimeout(() => {
      if (repoName) {
        getRepositories();
      } else {
        setRepositoryData();
      }
    }, 2000);

    return () => clearTimeout(getRepos);
  }, [repoName]);

  const [showCloseIcon, setshowCloseIcon] = useState(false);
  useEffect(() => {
    if (repoName !== "" && repoName) {
      setshowCloseIcon(true);
    } else {
      setActivePage(1);
      setshowCloseIcon(false);
    }
  }, [repoName]);

  const changeChandler = (e) => {
    setRepoName(e.target.value);
  };
  const debouncedResults = useMemo(() => {
    return debouce(changeChandler, 300);
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  return (
    <div className="home-page">
      <div className="sticky-section">
        <div className="title-main text-center">Repositories Finder</div>

        <div className="search-repo m-auto">
          <BsSearch className="search-icon" />
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for a repository"
              name="repoName"
              value={repoName}
              onChange={changeChandler}
            />
          </div>
          {showCloseIcon && <GrClose onClick={() => setRepoName("")} />}
        </div>
        <div className="sort-section d-flex align-items-center justify-content-end ">
          {/* stars, forks, help-wanted-issues, updated */}
          <select
            name="perpageItem"
            value={perpageItem}
            onChange={(e) => setperpageItem(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <select
            name="sortType"
            value={sortType}
            onChange={(e) => setsortType(e.target.value)}
          >
            <option value="stars">stars</option>
            <option value="forks">forks</option>
            <option value="help-wanted-issues">help-wanted-issues</option>
            <option value="update">update</option>
          </select>
          <select
            name="sortOrder"
            value={sortOrder}
            onChange={(e) => setsortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {loading && <Loading />}
      <div className="repositories d-flex align-items-center mt-5 justify-content-center flex-wrap">
        {repositoryData?.items.length
          ? repositoryData.items.map((item, index) => {
              return (
                <RepositoryInfo
                  key={index}
                  repoName={item?.name}
                  author={item?.owner?.login}
                  stars={item?.stargazers_count}
                  watchers={item?.watchers}
                  forks={item?.forks}
                  description={item?.description}
                  lastUpdate={item?.updated_at.substring(0, 10)}
                />
              );
            })
          : ""}
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <Pagination
        activePage={activepage}
        itemsCountPerPage={perpageItem}
        totalItemsCount={repositoryData?.total_count || 0}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default Homepage;
