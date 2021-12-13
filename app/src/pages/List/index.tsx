import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Pagination,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import useDebounce from "../../hooks/useDebounce";
import caretDown from "../../assets/caret-down.svg";
import caretUp from "../../assets/caret-up.svg";
import searchIcon from "../../assets/search.svg";
import listAddress from "../../services/listAddress";

const CaretDown = ({ disabled }: { disabled?: boolean }) => {
  return (
    <img
      src={caretDown}
      alt="Caret Down"
      style={{ opacity: disabled ? 0.4 : 1 }}
    />
  );
};

const CaretUp = () => {
  return <img src={caretUp} alt="Caret Up" />;
};

const tableHead = {
  email: "Email",
  name: "Nome",
  phone: "Telefone",
  cep: "CEP",
  address: "Endereço",
  city: "Cidade",
  state: "Estado",
} as Record<string, string>;

const PAGINATION_ITEMS_LIMIT = 5;
const PAGE_SIZE = 25;

function AddressList() {
  const [allAddress, setAllAddress] = useState<Address[]>([]);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [order, setOrder] = useState<"DESC" | "ASC" | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pagesTotal, setPagesTotal] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");

  const debouncedKeyword = useDebounce<string>(keyword, 500);

  const pages: number[] = useMemo(() => {
    let allPages: number[] = [];
    for (let i = 0; i < pagesTotal; i++) {
      allPages.push(i + 1);
    }

    return allPages;
  }, [pagesTotal]);

  const renderPages = useMemo(() => {
    if (pages.length <= 5) {
      return pages.slice(1, -1);
    }

    const half = Math.floor(PAGINATION_ITEMS_LIMIT / 2);

    if (page + half >= pages.length) {
      return pages.slice(1 - PAGINATION_ITEMS_LIMIT, -1);
    }

    if (page + half <= PAGINATION_ITEMS_LIMIT) {
      return pages.slice(1, PAGINATION_ITEMS_LIMIT - 1);
    }

    let pagesNextTo = [page];
    const fistPage = pages[0];
    const lastPage = pages[pages.length - 1];
    const pageIndex = pages.findIndex((p) => p === page);

    for (let i = 0; i < half; i++) {
      pages[pageIndex + i + 1] &&
        pages[pageIndex + i + 1] !== lastPage &&
        pagesNextTo.push(pages[pageIndex + i + 1]);
      pages[pageIndex - i - 1] &&
        pages[pageIndex - i - 1] !== fistPage &&
        pagesNextTo.unshift(pages[pageIndex - i - 1]);
    }

    return pagesNextTo.slice(1, -1);
  }, [page, pages]);

  const handleSearch = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setKeyword(target.value);
  };

  const handleOrder = (key: string) => () => {
    switch (order) {
      case null:
        setOrderBy(key);
        setOrder("ASC");
        break;

      case "ASC":
        if (key === orderBy) {
          setOrderBy(key);
          setOrder("DESC");
          break;
        }

        setOrderBy(key);
        setOrder("ASC");
        break;

      case "DESC":
        if (key === orderBy) {
          setOrderBy(null);
          setOrder(null);
          break;
        }

        setOrderBy(key);
        setOrder("ASC");
        break;
      default:
        break;
    }
  };

  const handlePagination = (action: "next" | "prev" | number) => () => {
    if (typeof action === "number") {
      setPage(action);
      return;
    }

    const fistPage = pages[0];
    const lastPage = pages[pages.length - 1];

    if (action === "prev") {
      page !== fistPage && setPage(page - 1);
    }

    if (action === "next") {
      page !== lastPage && setPage(page + 1);
    }
  };

  const getAddress = useCallback(async () => {
    try {
      const result = (
        await listAddress(page, PAGE_SIZE, orderBy, order, debouncedKeyword)
      ).data;

      if (result?.data) {
        setAllAddress(result.data.list);
        setPagesTotal(Math.ceil(result.data.total / PAGE_SIZE));
      }
    } catch (e) {
      setAllAddress([]);
    }
  }, [order, orderBy, page, debouncedKeyword]);

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  return (
    <Container className="d-flex justify-content-center align-items-center main-container flex-column">
      <Row>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <img src={searchIcon} alt="Search icon" />
          </InputGroup.Text>
          <FormControl onChange={handleSearch} placeholder="Busca" />
        </InputGroup>
      </Row>
      <Row>
        <Col>
          <Card>
            <Table striped bordered hover className="mb-0">
              <thead>
                {Object.keys(tableHead).map((h) => (
                  <th
                    style={{ cursor: "pointer" }}
                    className="user-select-none"
                    onClick={handleOrder(h)}
                  >
                    {tableHead[h]}
                    {orderBy === h && order ? (
                      order === "ASC" ? (
                        <CaretDown />
                      ) : (
                        <CaretUp />
                      )
                    ) : (
                      <CaretDown disabled={true} />
                    )}
                  </th>
                ))}
              </thead>
              <tbody>
                {allAddress.length ? (
                  allAddress.map((address) => (
                    <tr>
                      <td>{address.email}</td>
                      <td>{address.name}</td>
                      <td>{address.phone}</td>
                      <td>{address.cep}</td>
                      <td>
                        {address.neighborhood}, {address.address},{" "}
                        {address.number} - {address.additionalInfo}
                      </td>
                      <td>{address.city}</td>
                      <td>{address.state}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>Nenhum endereço encontrado!</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={7}>
                    <div className="w-100 d-flex justify-content-end align-items-center">
                      <Pagination size="sm" className="mb-0">
                        <Pagination.Prev onClick={handlePagination("prev")} />
                        <Pagination.Item
                          onClick={handlePagination(pages[0])}
                          active={page === pages[0]}
                        >
                          {pages[0]}
                        </Pagination.Item>

                        {pages.length > PAGINATION_ITEMS_LIMIT &&
                          page > PAGINATION_ITEMS_LIMIT - 2 && (
                            <Pagination.Ellipsis disabled />
                          )}

                        {renderPages.map((p) => (
                          <Pagination.Item
                            onClick={handlePagination(p)}
                            active={page === p}
                          >
                            {p}
                          </Pagination.Item>
                        ))}

                        {pages.length > PAGINATION_ITEMS_LIMIT &&
                          pages.length - page > PAGINATION_ITEMS_LIMIT - 3 && (
                            <Pagination.Ellipsis disabled />
                          )}
                        {pages.length > 1 && (
                          <Pagination.Item
                            onClick={handlePagination(pages[pages.length - 1])}
                            active={page === pages[pages.length - 1]}
                          >
                            {pages[pages.length - 1]}
                          </Pagination.Item>
                        )}
                        <Pagination.Next onClick={handlePagination("next")} />
                      </Pagination>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddressList;
