#!/usr/bin/env python3
"""Annotate the to_kv function's parameters
and return values with the appropriate types."""

from typing import Tuple, Union


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Returns a tuple of the key and value."""
    return (k, v**2)
