import { useEffect, useState } from "react";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewVetObjectionTable } from "../tables/viewVetObjection";

const ViewVettedObjection = () => {
  const [post, setPost] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);

  const newUrl = 'https://bespoque.dev/rhm-live/'

  useEffect(() => {
    let num = 1
    const fetchPost = async () => {
      try {
        const response = await fetch(`${newUrl}get-objection-batch.php?status=VETTED`, {
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
          if (records.find(v => v.status === "VETTED")) {
            records.find(v => v.status === "VETTED").status = "Print";
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
     
      <ViewVetObjectionTable submittedData={post} />
    </>
  );
};

export default ViewVettedObjection;
