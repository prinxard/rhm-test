import SectionTitle from "../section-title";
import url from "../../config/url";
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewPayslipTable } from "../tables/viewPayslipTable";

const PayslipList = () => {
  const [tccdata, setTccData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
 
  useEffect(() => {
    setAuthToken();
    let num = 1
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}paye/payslip?id=all`);
        res = res.data.body;
        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.serialNo = num + i
          rec.insert_time = dateformat(rec.insert_time, "dd mmm yyyy")
          records.push(rec);
        }
        setIsFetching(false);
        setTccData(() => records);
      } catch (e) {
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);


console.log(tccdata);
 


  return (
    <>

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
          <ViewPayslipTable tccdata={tccdata} />
    </>
  );
};

export default PayslipList;
