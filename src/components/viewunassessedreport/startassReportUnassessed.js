import SectionTitle from '../section-title';
import { useEffect, useState } from 'react';
import setAuthToken from '../../functions/setAuthToken';
import CustomButton from "../CustomButton/CustomButton";
import * as Icons from '../Icons/index';
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import Remove from '@material-ui/icons/Remove'
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import MaterialTable from "material-table";
import Loader from "react-loader-spinner";
import url from "../../config/url";
import axios from "axios";
import { formatNumber } from "accounting";
import dateformat from "dateformat";


const columns = [
  // {
  //   title: "SN",
  //   field: "serialNo",
  //   filtering: false,
  //   width: "10%"
  // },
  {
    title: "Taxpayer Name",
    field: "taxpayerName",
  },
  {
    title: "Assessment Id",
    field: "assessment_id",
  },
  {
    title: "Ref",
    field: "ref",
  },
  {
    title: "KGTIN",
    field: "t_payer",
  },
  {
    title: "MDA",
    field: "mda",
  },
  {
    title: "Revenue Item",
    field: "revenueItem",
  },
  {
    title: "Amout",
    field: "amount",
    render: (expense) => formatNumber(expense.amount)
  },
  {
    title: "Tax Office",
    field: "station",
  },
  {
    title: "Payment Channel",
    field: "channel_id",
  },
  {
    title: "Bank",
    field: "bank",
  },
  {
    title: "Created Time",
    field: "createtime",
    render: (timecreated) => dateformat(timecreated.createtime, "yyyy-mm-dd")
  },
];

const StartReportUnassessed = () => {
  const [post, setPost] = useState(() => []);
  const [isFetching, setIsFetching] = useState(() => true);

  useEffect(() => {
    let num = 1
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}forma/unassessed-amount`);
        res = res.data.body.unassessedAmount;
        console.log("res", res);
        setIsFetching(false);
        setPost(() => res);
      } catch (e) {
        setIsFetching(false);
        console.log(e);
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <SectionTitle title="Unassessed Collections" />

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

      <MaterialTable title="Unassessed Collections"
        columns={columns}
        data={post}

        options={{
          search: true,
          paging: true,
          filtering: true,
          exportButton: {
            csv: true,
            pdf: false
          },
          exportAllData: true,

        }}
        icons={{
          Check: Check,
          DetailPanel: ChevronRight,
          Export: SaveAlt,
          Filter: () => <Icons.Filter />,
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
          Search: Search,
          ThirdStateCheck: Remove,
          Clear: Clear,
          SortArrow: ArrowDownward
        }}
      />

    </>
  );
}
export default StartReportUnassessed