import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewVerifiedObjectionTable } from "../tables/viewVerifiedObjection";
import { ViewApprovedObjectionTable } from "../tables/viewApprovedObjection";

const ViewApprovedObjection = () => {
  const [post, setPost] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);

  const newUrl = 'https://bespoque.dev/rhm-live/'

  useEffect(() => {
    let num = 1
    // setAuthToken();
    const fetchPost = async () => {
      try {
        // let res = await axios.get(`${url.BASE_URL}forma/objection?status=Approved`);
        const response = await fetch(`${newUrl}get-objection-batch.php?status=Approved`, {
          method: 'GET',
        });
        const objectData = await response.json();
        let res = objectData.body;
        let records = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          rec.serialNo = num + i
          rec.income = formatNumber(rec.income)
          rec.tax = formatNumber(rec.tax)
          rec.createtime = dateformat(rec.createtime, "dd mmm yyyy")
          records.push(rec);
        }
        records.map(() => {
          if (records.find(v => v.status === "Approved")) {
            records.find(v => v.status === "Approved").status = "Pending EC Sign";
          }

        })

        setIsFetching(false);
        setPost(() => records);
      } catch (e) {
        setIsFetching(false);
        console.log(e.response);
      }
    };
    fetchPost();
  }, []);
  console.log(post);


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

      <ViewApprovedObjectionTable submittedData={post} />
    </>
  );
};

export default ViewApprovedObjection;
