import SectionTitle from "../section-title";
import Widget from "../widget";
import { NewFormInput } from "../FormInput/formInputs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { formatNumber } from "../../functions/numbers";
import { DeleteButton } from "../CustomButton/CustomButton";
import Loader from "react-loader-spinner";
import { ViewSingleNonIndividualTable } from "../tables/viewNonIndividual";


const ViewNonIndividualSingle = () => {
  const [individualRec, setindividualRec] = useState(() => {});
  const [total, setTotal] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [query, setQuery] = useState(() => "");
  const router = useRouter();
  useEffect(() => {
    if (router && router.query) {
      let indvkgtin = router.query.ref;
      let kgtin = {
        "KGTIN": `${indvkgtin}`
      }
      console.log(kgtin);
      setAuthToken();
      const fetchPost = async () => {
        try {
          let res = await axios.post(
            `${url.BASE_URL}taxpayer/view-non-individual`, kgtin
          );
          res = res.data.body;
          console.log(res);
          setindividualRec(res)
          setIsFetching(false);
        } catch (e) {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [router]);



  return (
    <>
      <SectionTitle subtitle="Non-Individual Taxpayer Biodata" />

      <Widget>

        <>
          {isFetching ? (
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
          ) :
            <ViewSingleNonIndividualTable indvdata={individualRec} />
          }
        </>
      </Widget>
    </>
  );
};

export default ViewNonIndividualSingle;
