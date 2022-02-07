/** @format */

import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = ({ pages, page, setPaginatePage }) => {
  return (
    pages > 1 && (
      <Pagination className="justify-content-center mt-5">
        {[...Array(pages).keys()].map((x) => (
          <span onClick={() => setPaginatePage(x + 1)} key={x + 1}>
            <Pagination.Item
              active={x + 1 === page}
              className="paginationItemStyle"
            >
              {x + 1}
            </Pagination.Item>
          </span>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
