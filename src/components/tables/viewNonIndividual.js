import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from '../Icons/index';
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from 'next/link';
import CustomButton from "../CustomButton/CustomButton";
import MaterialTable from "material-table";
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


const columns = [
  {
    title: "SN",
    field: "serialNo",
    filtering: false,
    width: "10%"
  },

  {
    title: "KGTIN",
    field: "KGTIN",
  },

  {
    title: "Company Name",
    field: "regist_name",
  },
  {
    title: "Type of Org",
    field: "type_of_organisation",
  },
  {
    title: "Phone",
    field: "phone_no",
  },
  {
    title: "Tax Office",
    field: "tax_office",
  },

  {
    title: "Create Time",
    field: "createtime",
  },


];

export const ViewNonIndividualTable = ({ nonIndData }) => {
  let data = nonIndData;
  return (
    <>
      <MaterialTable title="Non-Individual Taxpayers List"
        columns={columns}
        data={data}
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
        onRowClick={(event, rowData) => {
          window.open(`/view/nonindividual/${rowData.KGTIN}`, "_self")
          event.stopPropagation();
        }}
      />
    </>
  );
};

const singleFields = [
  {
    name: 'KGTIN',
    key: 'KGTIN',
  },
  {
    name: 'Title',
    key: 'indv_title',
  },
  {
    name: 'Surname',
    key: 'surname',
  },
  {
    name: 'First Name',
    key: 'first_name',
  },
  {
    name: 'Gender',
    key: 'gender',
  },
  {
    name: 'Marital Status',
    key: 'marital_status',
  },
  {
    name: 'BVN',
    key: 'bvn',
  },
  {
    name: 'Birth Date',
    key: 'birth_date',
  },

  {
    name: 'Birth Place',
    key: 'birth_place',
  },

  {
    name: 'Occupation',
    key: 'occupation',
  },
  {
    name: 'city',
    key: 'city',
  },
  {
    name: 'LGA',
    key: 'lga',
  },
  {
    name: 'Phone',
    key: 'phone_number',
  },
  {
    name: 'Employer Name',
    key: 'employer_name',
  },
];

export const ViewSingleNonIndividualTable = ({ indvdata }) => {
  const items = indvdata;
  console.log(items);

  return (
    <>
      <Widget>
        <div className="flex justify-start mb-4">
          <div className="m-3 bg-green-400 text-white rounded-full">
            <CustomButton type="Submit">
              Print Certificate
            </CustomButton>
          </div>
          <div className="m-3 bg-green-400 text-white rounded-full">
            <CustomButton type="Submit">
              Update User
              {/* <Link href={`/update-user/${ind.KGTIN}`} key={i}> Update User</Link> */}

            </CustomButton>
          </div>
        </div>
        <div className="w-2/3 flex mx-auto rounded border">
          <table className="table striped">

            <tbody className="divide-y ">
              <tr className="">
                <td>KGTIN</td>
                <td>{items.KGTIN}</td>
              </tr>
              <tr className="">
                <td>Company TIN</td>
                <td>{items.companytin}</td>
              </tr>
              <tr className="">
                <td>Company Name</td>
                <td>{items.coy_name}</td>
              </tr>
              <tr className="">
                <td>City</td>
                <td>{items.city}</td>
              </tr>
              <tr className="">
                <td>Date of incorporation</td>
                <td>{items.date_of_incorporation}</td>
              </tr>
              <tr className="">
                <td>Line of Business</td>
                <td>{items.line_of_business}</td>
              </tr>
              <tr className="">
                <td>Type of Organization</td>
                <td>{items.type_of_organisation}</td>
              </tr>
              <tr className="">
                <td>Enterprise Reg No</td>
                {items.enterprise_reg_no == null || items.enterprise_reg_no == "" ?
                  <td>-</td>
                  : <td>{items.enterprise_reg_no}</td>}
              </tr>
              <tr className="">
                <td>RC No</td>
                {items.rcno == null || items.rcno == "" ?
                  <td>-</td>
                  : <td>{items.rcno}</td>}
              </tr>
              <tr className="">
                <td>State</td>
                <td>{items.state}</td>
              </tr>
              <tr className="">
                <td>Tax Authority</td>
                <td>{items.tax_authority}</td>
              </tr>
              <tr className="">
                <td>Tax Office</td>
                <td>{items.tax_office}</td>
              </tr>
              <tr className="">
                <td>LGA</td>
                <td>{items.lga}</td>
              </tr>
              <tr className="">
                <td>Phone</td>
                {items.phone_no == null || items.phone_no == "" ?
                  <td>-</td>
                  : <td>{items.phone_no}</td>}
              </tr>
              <tr className="">
                <td>Email</td>
                {items.e_mail == null || items.e_mail == "" ?
                  <td>-</td>
                  : <td>{items.e_mail}</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};