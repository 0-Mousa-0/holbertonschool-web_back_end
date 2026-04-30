#!/usr/bin/env python3


def index_range(page, page_size):
    """a method return page requested and contant rows of it"""
    p = page
    ps = page_size
    if page == 1:
        page_size = page_size
        page = 0
        return (page, page_size)

    else:
        page = (p - 1) * ps
        page_size = p * ps
        return (page, page_size)
