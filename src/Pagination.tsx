import { Pagination } from 'react-bootstrap';

type Props = {
    pageCount: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
  };
  
  function MyPagination({ pageCount, currentPage, setCurrentPage }: Props) {
    const pageLimit = 5; // number of pages to display at a time
    const pagesToShow: (number | 'ellipsis')[] = [];
  
    // calculate start and end pages
    let startPage = Math.max(0, currentPage - Math.floor(pageLimit / 2));
    let endPage = Math.min(pageCount - 1, startPage + pageLimit - 1);
  
    // adjust start and end pages to ensure we show `pageLimit` pages
    if (endPage - startPage + 1 < pageLimit) {
      if (startPage === 0) {
        endPage = Math.min(pageCount - 1, startPage + pageLimit - 1);
      } else {
        startPage = Math.max(0, endPage - pageLimit + 1);
      }
    }
  
    // add ellipses if there are more pages to show
    if (startPage > 0) {
      pagesToShow.push('ellipsis');
    }
  
    // generate array of pages to display
    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }
  
    if (endPage < pageCount - 1) {
      pagesToShow.push('ellipsis');
    }
  
    return (
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(0)} disabled={currentPage === 0} />
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0} />
  
        {pagesToShow.map((page, index) => {
          if (page === 'ellipsis') {
            return <Pagination.Ellipsis key={index} />;
          } else {
            return (
              <Pagination.Item key={index} active={currentPage === page} onClick={() => setCurrentPage(page)}>
                {page + 1}
              </Pagination.Item>
            );
          }
        })}
  
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount - 1} />
        <Pagination.Last onClick={() => setCurrentPage(pageCount - 1)} disabled={currentPage === pageCount - 1} />
      </Pagination>
    );
  }

export default MyPagination;