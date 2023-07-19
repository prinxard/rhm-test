import SectionTitle from "../section-title";
import Widget from "../widget";
import { SubmitButton } from "../CustomButton/CustomButton";
import { NewFormInput } from "../FormInput/formInputs";
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
import { ViewPendingTable } from "../tables/viewDirectAss";

const ViewPendingAssessment = () => {
  const [post, setPost] = useState(() => []);
  const [sum, setSum] = useState(() => null);
  const [totalemp, setTotalemp] = useState('');
  const [isFetching, setIsFetching] = useState(() => true);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(() => 10);
  const [year, setYear] = useState('');
  const [query, setQuery] = useState(() => "");

  let num = 1
  useEffect(() => {
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/list-assessment?assmt=Draft`);
        res = res.data.body.assessmentDraft;
        console.log(res)
        let employeessTotal = res.length
        setTotalemp(employeessTotal)
        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.serialNo = num + i
          rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
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



  return (
    <>
      <SectionTitle title="View direct assessments" subtitle="Pending Direct Assessments" />

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
      
      <ViewPendingTable draftData={post} />
    </>
  );
};

export default ViewPendingAssessment;
