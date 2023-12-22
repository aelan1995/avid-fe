"use client";
import { Card, CardHeader, CardBody, Typography } from "./providers.js";

import * as React from 'react';
import axios from 'axios';
import { Pagination } from "./getPagination.js";

import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';

const BASE_URL = 'https://demoapi.jcadevdomain.com/api/contract';

const INITIAL_PARAMS = {
  search: 'react',
  filter: false,
  page: 0,
};


const Contracts = () => {

  const [search, setSearch] = React.useState('react');

  const [filter, setFilter] = React.useState(INITIAL_PARAMS.filter);

  const handleSearch = (event) => {
     setSearch(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.checked);
  };

  const [data, setData] = React.useState({
    nodes: [],
    totalPages: 0,
    currentPages: 0,
  });

  const pagination = usePagination(
    data,
    {
      state: {
        page: INITIAL_PARAMS.page,
      },
      onChange: onPaginationChange,
    },
    {
      isServer: true,
    }
  );

  const timeout = React.useRef();
  function onSearchChange(action, state) {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(
      () =>
        fetchData({
          search: state.search,
          filter,
          page: pagination.state.page,
        }),
      500
    );
  }

  function onFilterChange(action, state) {
    fetchData({
      search,
      filter: state.filter,
      page: pagination.state.page,
    });
  }

  function onPaginationChange(action, state) {
    fetchData({
      search,
      filter,
      page: state.page,
    });
  }

  const fetchData = React.useCallback(async (params) => {
    let url = `${BASE_URL}?query=${params.search}&page=${params.page}`;

    if (params.filter) {
      url = `${url}&tags=ask_hn`;
    }

    const result = await axios.get(url);

    setData({
      nodes: result.data.data,
      totalPages: result.data.total,
      currentPages: result.data.current_page,
    });
  }, []);

  React.useEffect(() => {
    fetchData({
      search: INITIAL_PARAMS.search,
      filter: INITIAL_PARAMS.filter,
      page: INITIAL_PARAMS.page,
    });
  }, [fetchData]);


  return (
    <>
      <Card className="overflow-scroll ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Adrian WFH
                </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
            <Table data={data} pagination={pagination} className="w-full min-w-max table-auto mx-auto">
              {(tableList) => (
                <>
                  <Header>
                    <HeaderRow>
                      <HeaderCell>Contract Key</HeaderCell>
                      <HeaderCell>Contract No</HeaderCell>
                      <HeaderCell>Contract Type</HeaderCell>
                      <HeaderCell>Contract Sub Type</HeaderCell>
                    </HeaderRow>
                  </Header>

                  <Body>
                    {tableList.map((item) => (
                      <Row key={item.contract_key} item={item} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Cell>{item.contract_key}</Cell>
                        <Cell>{item.contract_no}</Cell>
                        <Cell>{item.contract_type}</Cell>
                        <Cell>{item.contract_sub_type}</Cell>
                      </Row>
                    ))}
                  </Body>
                  <Pagination
                  className="pagination-bar p-24"
                  currentPage={data.currentPages}
                  totalCount={data.totalPages}
                  pageSize={1000}
                  onPageChange={page => pagination.fns.onSetPage(page)}/>
                </>
              )}
          </Table>
        </CardBody>
      </Card>
   </>
  );
};

export { Contracts }




