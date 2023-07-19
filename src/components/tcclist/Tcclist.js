import SectionTitle from "../section-title";
import Widget from "../widget";
import { SubmitButton } from "../CustomButton/CustomButton";
import { NewFormInput } from "../FormInput/formInputs";
import { ViewIndividualTable } from "../tables/viewIndividual"
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
import { ViewTccTable } from "../tables/viewTccTable";

const TccList = () => {
  const [tccdata, setTccData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
 
  useEffect(() => {
    setAuthToken();
    let num = 1
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/list-tcc`);
        res = res.data.body.tcc;
        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.serialNo = num + i
          rec.prc_fee = formatNumber(rec.prc_fee)
          rec.crt_time = dateformat(rec.crt_time, "dd mmm yyyy")
          records.push(rec);
        }
        records.map(()=>{
          if (records.find(v => v.status === "Approved")) {
            records.find(v => v.status === "Approved").status = "Pending E.C Signature";
          }

        })
        setIsFetching(false);
        setTccData(() => records);
      } catch (e) {
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);
 


  return (
    <>
      <SectionTitle title="View TCC" subtitle="Tcc List " />

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
          <ViewTccTable tccdata={tccdata} />
    </>
  );
};

export default TccList;
