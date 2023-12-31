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
import * as Icons from '../../components/Icons/index';
import { formatNumber } from "accounting";
import { useEffect, useState } from "react";




export default function Reportstable({ FilteredData }) {
    const [totalAmount, setTotalAmount] = useState(() => 0);

    useEffect(() => {
        const sum = FilteredData.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        setTotalAmount(sum);

    }, [FilteredData])

    const fields = [
        {
            title: "Name",
            field: "taxpayerName",
        },
        {
            title: "Taxpayer ID",
            field: "t_payer",
        },
        {
            title: "Assessment ID",
            field: "assessment_id",
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
            title: "Ref",
            field: "ref",
        },
        {
            title: "Bank",
            field: "bank",
        },
        {
            title: "Channel",
            field: "channel_id",
        },
        {
            title: "Amount",
            field: "amount",
            render: (expense) => formatNumber(expense.amount)
        },

        {
            title: "Station",
            field: "station",
        },
        {
            title: "Transaction Date",
            field: "tran_date",
        },
    ];


    return (
        <>
            <MaterialTable
                title={`Collection Report - total amount: ${formatNumber(totalAmount)}`}
                data={FilteredData}
                columns={fields}
                options={{
                    search: false,
                    paging: true,
                    filtering: true,
                    exportButton: {
                        csv: true,
                        pdf: false
                    },
                    exportAllData: true
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

                    window.open(`collection-receipt/${rowData.idpymt}`, "_self")
                    event.stopPropagation();

                }}
            />

        </>
    )
}
