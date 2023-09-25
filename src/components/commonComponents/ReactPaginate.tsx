import ReactPaginate from 'react-paginate';

const PaginatedItems = ({ itemsPerPage, setItemOffset, items }: any) => {
    const pageCount = Math.ceil(items.length / itemsPerPage);
    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <ReactPaginate
            disabledClassName="[&>a]:text-[#e6e6e6]"
            previousLabel="< Previous"
            nextLabel="Next >"
            breakLabel="..."
            breakClassName="break-me"
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            breakLinkClassName="relative block w-9 h-9 flex justify-center items-center leading-tight text-black hover:cursor-pointer hover:bg-[#dee2e6] rounded-full mx-1 text-sm font-semibold"
            containerClassName="flex justify-end pl-0 list-none pt-5 rounded-sm"
            pageClassName="[&.active>a]:bg-blue-300"
            pageLinkClassName="relative block w-9 h-9 flex justify-center items-center leading-tight text-black hover:cursor-pointer hover:bg-[#dee2e6] rounded-full mx-1 text-sm font-semibold"
            previousClassName="[&.active>a]:bg-blue-300"
            previousLinkClassName="relative block h-full px-3 flex justify-center items-center  leading-tight text-black hover:cursor-pointer hover:bg-[#dee2e6] hover-rounded-3xl mx-1 border border-gray-300 rounded-3xl text-sm font-semibold"
            nextClassName="[&.active>a]:bg-blue-300"
            nextLinkClassName="relative block h-full px-3 flex justify-center items-center leading-tight text-black hover:cursor-pointer hover:bg-[#dee2e6] hover-rounded-3xl mx-1 border border-gray-300 rounded-3xl text-sm font-semibold"
            activeClassName="active"
        />
    );
}

export default PaginatedItems;