import SectionTitle from "../section-title";
import Widget from "../widget";
import { SubmitButton } from "../CustomButton/CustomButton";
import { NewFormInput } from "../FormInput/formInputs";
import { ViewIndividualTable } from "../../components/tables/viewIndividual"
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import Widget1 from "../dashboard/widget-1";
import * as Icons from '../Icons/index';
import { ViewUsersTable } from "../tables/viewUsers";

const ViewUsers = () => {
  const [post, setPost] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(() => 10);
  const [query, setQuery] = useState(() => "");
  useEffect(() => {
    setAuthToken();
    let num = 1
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}user/users`);
        res = res.data.body.users;
        console.log(res);
        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.serialNo = num + i
          rec.createdAt = dateformat(rec.createdAt, "dd mmm yyyy")
          records.push(rec);
        }
        setIsFetching(false);
        setPost(() => records);
      } catch (e) {
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);


  // Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const next = (currentPage) => setCurrentPage(() => currentPage + 1);
  const previous = (currentPage) => setCurrentPage(() => currentPage - 1);

  const searchHandler = (e) => {
    setQuery(() => e.target.value);
  };

  let res = [];
  const search = (rows) => {
    let data = [];
    data = rows.filter((rows) => rows.email.toLowerCase().indexOf(query) > -1);
    res.push(data);
    return data;
  };

  const searchedPost = search(post).slice(indexOfFirstPost, indexOfLastPost);
  console.log("searched", searchedPost);

  return (
    <>
      <SectionTitle title="View Users" subtitle="User List" />

      {isFetching && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="#00FA9A"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p>Fetching data...</p>
        </div>
      )}
      <Widget>
        <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
          <div className="w-full lg:w-2/12">
            <NewFormInput
              label="Search by Email"
              required
              onChange={searchHandler}
            />
          </div>
        </div>

        <div className="mt-4">
          {query !== "" ? (
            <>
              <ViewUsersTable remittance={searchedPost} />
              <CustomPagination
                paginate={paginate}
                totalPosts={res[0].length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          ) : (
            <>
              <ViewUsersTable remittance={currentPosts} />
              <CustomPagination
                paginate={paginate}
                totalPosts={post.length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          )}
        </div>
      </Widget>
    </>
  );
};

export default ViewUsers;
