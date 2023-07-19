import React from 'react'
import '@tremor/react/dist/esm/tremor.css'
import url from "../../../config/url";
import { formatNumber } from "accounting";
import {
    Card, Title, Bold, AreaChart, Text,
    Metric, BarChart, Subtitle, LineChart,
    Table, TableHead, TableRow,
    TableHeaderCell,
    TableBody,
    TableCell, Badge
} from "@tremor/react";
import UseFetcher from '../../fetcher/useFetcher';
import Widget1 from '../../dashboard/widget-1';
import { useEffect, useState } from 'react';
import { Unassessed } from '../../Icons';

export default function PayeDashboard() {
    const [overview, setOverview] = useState([])
    const [recentCol, setRecentCol] = useState([])
    const { data, isLoading, isError } = UseFetcher(
        `${url.BASE_URL}paye/dashboard`
    );

    useEffect(() => {
        if (data) {
            const payeCards = data.overview
            const reccol = data.recentCollection
            const colCurrYr = data.collectionCurYr
            setRecentCol(reccol)
            setOverview(payeCards)
        }
    }, [data]);

    const chartdata = [
        {
            year: "Jan",
            "collection": 1.74,
        },
        {
            year: "Feb",
            "collection": 1.93,
        },
        {
            year: "March",
            "collection": 1.9,
        },
        {
            year: "April",
            "collection": 1.98,
        },
        {
            year: "May",
            "collection": 2,
        },
    ];

    const bardata = [
        {
            name: "Ank",
            "collection": 2488,
        },
        {
            name: "Any",
            "collection": 1445,
        },
        {
            name: "Kbb",
            "collection": 743,
        },
        {
            name: "Lkj 1",
            "collection": 2488,
        },
        {
            name: "Lkj 2",
            "collection": 1445,
        },
        {
            name: "Ajk",
            "collection": 743,
        },
        {
            name: "Isn",
            "collection": 743,
        },
        {
            name: "HQ",
            "collection": 743,
        },
        {
            name: "Adv",
            "collection": 743,
        },
        {
            name: "Kot",
            "collection": 743,
        },
        {
            name: "Okn",
            "collection": 743,
        },
        {
            name: "Idh",
            "collection": 743,
        },
    ];


    const dataFormatter = (number) => {
        return "₦ " + Intl.NumberFormat("us").format(number).toString();
    };
    return (
        <div>
            <div className="flex justify-center"><Subtitle>PAYE DASHBOARD</Subtitle></div>
            {overview.map((data) => (
                <div className="flex my-10 flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">

                    <div className="w-full lg:w-1/4">
                        <Widget1
                            color="blue"
                            title="Month"
                            description={`${formatNumber(data.monthPayroll)} Payroll Schedule`}
                        // right={<TotalRemittance />}
                        />
                    </div>

                    <div className="w-full lg:w-1/4">
                        <Widget1
                            color="purple"
                            title="Year"
                            description={`${formatNumber(data.yearPayroll)} Payroll Schedule`}
                        // right={<PendingRemittance />}
                        />
                    </div>

                    <div className="w-full lg:w-1/4">
                        <Widget1
                            color="green"
                            title="Month"
                            description={`${formatNumber(data.monthAmount)} - Paye Collection`}
                        // right={<RevenueItems />}
                        />
                    </div>

                    <div className="w-full lg:w-1/4">
                        <Widget1
                            color="red"
                            title="Year"
                            description={`${formatNumber(data.yearAmount)} - Paye Collection`}
                            // right={<Unassessed />}
                        />
                    </div>
                </div>

            ))}

            <div className="flex gap-2 mb-4 flex-col lg:flex-row w-full">
                <Card>
                    <Title>Payroll Schedule</Title>
                    <BarChart
                        data={bardata}
                        dataKey="name"
                        categories={["collection"]}
                        colors={["purple"]}
                        valueFormatter={dataFormatter}
                        marginTop="mt-6"
                        yAxisWidth="w-12"
                    />
                </Card>

                <Card>
                    <Title>Payroll Schedule</Title>
                    <LineChart
                        data={chartdata}
                        dataKey="year"
                        categories={["collection"]}
                        colors={["blue"]}
                        valueFormatter={dataFormatter}
                        marginTop="mt-6"
                        yAxisWidth="w-10"
                    />
                </Card>
            </div>

            <Card>
                <Title>Recent Collections</Title>
                <Table marginTop="mt-5">
                    <TableHead>
                        <TableRow>
                           
                            <TableHeaderCell>
                                KGTIN
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Ref
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Channel
                            </TableHeaderCell>
    
                            <TableHeaderCell>
                                Amount
                            </TableHeaderCell>
                         
                            <TableHeaderCell>
                                Station
                            </TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentCol.map((item) => (
                            <TableRow key={item.id}>
                    
                                <TableCell>
                                    <Text>{item.t_payer}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.ref}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.channel_id}</Text>
                                </TableCell>
                             
                                <TableCell>
                                    <Text>{formatNumber(item.amount)}</Text>
                                </TableCell>
                          
                                <TableCell>
                                    <Text>{item.station}</Text>
                                </TableCell>
                                {/* <TableCell>
                                    <Badge text={item.status} color="emerald" icon={StatusOnlineIcon} />
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
