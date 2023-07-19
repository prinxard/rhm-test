import MaterialTable from '@material-table/core';
import { Delete, Edit, MoreHoriz, AttachMoney } from "@material-ui/icons";
import React, { useEffect, useState } from 'react'
import url from "../../../config/url";
import setAuthToken from '../../../functions/setAuthToken';
import * as Icons from '../../../components/Icons/index';
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
import Loader from "react-loader-spinner";
import axios from "axios";
import { formatNumber } from 'accounting';
import dateformat from "dateformat";
import { useRouter } from 'next/router';

const ListAgents = () => {
    const [post, setPost] = useState(() => []);
    const [isFetching, setIsFetching] = useState(() => true);
    const router = useRouter();

    const columns = [
        {
            title: "name",
            field: "name",
        },
        {
            title: "Phone",
            field: "phone",
        },
        {
            title: "Email",
            field: "user",
        },
        {
            title: "Balance",
            field: "balance",
            render: (balance) => formatNumber(balance.balance)
        },
        {
            title: "Created Time",
            field: "createdAt",
            render: (timecreated) => dateformat(timecreated.createdAt, "yyyy-mm-dd")
        },
    ];

    useEffect(() => {

        setAuthToken();
        const fetchPost = async () => {
            try {
                let res = await axios.get(`${url.BASE_URL}market/admin/agent/profile?id=all`);
                res = res.data.body.userDetails
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


            <MaterialTable title="Agents list"
                columns={columns}
                data={post}

                actions={
                    [

                        {
                            icon: MoreHoriz,
                            tooltip: 'View Profile',
                            onClick: (event, rowData) => router.push(`/view/agents/${rowData.user}`),
                            
                        },
                        {
                            icon: Edit,
                            tooltip: 'Edit',
                            onClick: (event, rowData) => router.push(`/markets/agents/register/${rowData.user}`),
                            
                        },
                        {
                            icon: AttachMoney,
                            tooltip: 'Fund Wallet',
                            onClick: (event, rowData) => router.push(`/markets/agents/fund/${rowData.user}`),
                            
                        }
                    ]}

                options={{
                    search: true,
                    paging: true,
                    filtering: true,
                    actionsColumnIndex: -1,
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
                // onRowClick={(event, rowData) => {
                //     window.open(`/view/agents/${rowData.user}`, "_self")
                //     event.stopPropagation();
                // }}
            />
        </>
    )
}

export default ListAgents