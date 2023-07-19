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
import { ViewTccPrintTable } from "../tables/viewTccTablePrint";

const TccPrintList = () => {
  const [tccdata, setTccData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);

  // useEffect(() => {
  //   setAuthToken();
  //   let num = 1
  //   const fetchPost = async () => {
  //     try {
  //       let res = await axios.get(`${url.BASE_URL}forma/list-tcc`);
  //       res = res.data.body.tccPrint;
  //       let records = [];
  //       console.log(res);
  //       for (let i = 0; i < res.length; i++) {
  //         let rec = res[i];
  //         rec.amount1 = formatNumber(rec.amount1)
  //         rec.amount2 = formatNumber(rec.amount2)
  //         rec.amount3 = formatNumber(rec.amount3)
  //         rec.serialNo = num + i
  //         rec.prc_fee = formatNumber(rec.prc_fee)
  //         rec.crt_time = dateformat(rec.crt_time, "dd mmm yyyy")
  //         records.push(rec);
  //       }
  //       setIsFetching(false);
  //       setTccData(() => records);

  //     } catch (e) {
  //       setIsFetching(false);
  //     }
  //   };
  //   fetchPost();
  // }, []);


  useEffect(() => {
    setAuthToken();
    let num = 1;
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/list-tcc`);
        res = res.data.body.tccPrint;
        const records = res.map((rec, index) => ({
          ...rec,
          amount1: formatNumber(rec.amount1),
          amount2: formatNumber(rec.amount2),
          amount3: formatNumber(rec.amount3),
          serialNo: num + index,
          prc_fee: formatNumber(rec.prc_fee),
          crt_time: dateformat(rec.crt_time, "dd mmm yyyy")
        }));

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
      <SectionTitle title="View TCC Print List" subtitle="Tcc Print List " />

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
      <ViewTccPrintTable tccdata={tccdata} />
    </>
  );
};

export default TccPrintList;
