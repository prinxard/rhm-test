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
import { ViewBOJTable } from "../tables/viewBojTable";
import { ViewGroupTable } from "../tables/viewUserGroupTable";

const GroupList = () => {
  const [userGrpData, setUserGrpData] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);

  useEffect(() => {

    let num = 1
    const fetchPost = async () => {
      try {
        const response = await fetch('https://bespoque.dev/rhm/get-usergroups-batch.php')
        setIsFetching(false);
        const data = await response.json()
        console.log("data", data.body)
        // for (let i = 0; i < res.length; i++) {
        //   let rec = data.body[i]

        // }
        setUserGrpData(data.body)
      } catch (error) {
        console.log(error.message)
        setIsFetching(false);
      }
    };
    fetchPost();
  }, []);






  return (
    <>
      <SectionTitle subtitle="User group list" />

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
      <ViewGroupTable userGrpData={userGrpData} />
    </>
  );
};

export default GroupList;
