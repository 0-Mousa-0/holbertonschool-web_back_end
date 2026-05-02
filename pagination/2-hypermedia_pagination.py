#!/usr/bin/env python3
"""This module implements hypermedia pagination for a dataset of baby names."""

import csv
import math
from typing import Any, Dict, List, Tuple, Optional


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return a tuple of (start_index, end_index) for pagination."""
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return start_index, end_index


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        """Initialize the server with an empty dataset cache."""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset loaded from CSV (header excluded)."""
        if self.__dataset is None:
            with open(self.DATA_FILE, newline="") as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Return a page of the dataset, or an empty list if out of range."""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start_index, end_index = index_range(page, page_size)
        data = self.dataset()

        if start_index >= len(data):
            return []
        return data[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
        Return pagination metadata with the current page data.

        The returned dictionary contains:
        - page_size: length of the returned page data
        - page: current page number
        - data: the page data
        - next_page: next page number or None
        - prev_page: previous page number or None
        - total_pages: total number of pages (ceil)
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        data_page = self.get_page(page, page_size)
        dataset_len = len(self.dataset())
        total_pages = math.ceil(dataset_len / page_size) if page_size else 0

        prev_page: Optional[int] = page - 1 if page > 1 else None
        next_page: Optional[int] = page + 1 if page < total_pages else None

        return {
            "page_size": len(data_page),
            "page": page,
            "data": data_page,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages,
        }
