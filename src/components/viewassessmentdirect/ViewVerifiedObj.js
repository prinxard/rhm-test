import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewVerifiedObjectionTable } from "../tables/viewVerifiedObjection";


const ViewVerifiedObjection = () => {
  const [post, setPost] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const newUrl = 'https://bespoque.dev/rhm-live/'
  useEffect(() => {
    let num = 1
    setAuthToken();
    const fetchPost = async () => {
      try {
        let records = [];
        const response = await fetch(`${newUrl}get-objection-batch.php?status=Verified`, {
          method: 'GET',
        });
        const objectData = await response.json();
        let res = objectData.body;
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.serialNo = num + i
          rec.income = formatNumber(rec.income)
          rec.tax = formatNumber(rec.tax)
          rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
          records.push(rec);
        }

        setIsFetching(false);
        setPost(() => records);
      } catch (e) {
        setIsFetching(false);
        console.log(e.response);
      }
    };
    fetchPost();
  }, []);



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
     
      <ViewVerifiedObjectionTable submittedData={post} />
    </>
  );
};

export default ViewVerifiedObjection;
