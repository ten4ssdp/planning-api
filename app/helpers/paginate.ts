interface Pagination {
  offset: number;
  limit: number;
}

const paginate = (page: number, pageSize: number): Pagination => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};

export default paginate;
