#!/usr/bin/env python3
"""A type-annotated function sum_mixed_list that takes a list of
integers and floats and returns their sum as a float."""

from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """Sum a list of integers and floats.

    Args:
            mxd_lst: A list of integers and floats."""
    return sum(mxd_lst)
