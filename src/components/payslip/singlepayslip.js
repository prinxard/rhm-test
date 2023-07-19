import SectionTitle from "../section-title";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { ViewSinglePayslip } from "../tables/viewPayslipTable";
import { useRouter } from "next/router";

const SinglePayslip = () => {
  const [paySlipData, setPayslipData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const router = useRouter()
console.log("paySlipData", paySlipData);

  useEffect(() => {
    if (router && router.query) {
      let payslipId = router.query.ref;
      setAuthToken();
      const fetchPost = () => {
        setIsFetching(true)
        axios.get(`${url.BASE_URL}paye/payslip?id=${payslipId}`)
            .then(function (response) {
                setIsFetching(false)
                let fetchPayslip = response.data.body.payroll;
                console.log("fetchPayslip", fetchPayslip);
                setPayslipData(fetchPayslip)
            })
            .catch(function (error) {
              setIsFetching(false);
                console.log(error);

            })
      };
      fetchPost();
    }
  }, [router]);

  return (
    <>
      <SectionTitle title="View Income details" />

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
      <ViewSinglePayslip paySlipData={paySlipData} />
    </>
  );
};

export default SinglePayslip;


