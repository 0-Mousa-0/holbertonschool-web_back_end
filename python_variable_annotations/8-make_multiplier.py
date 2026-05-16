#!/usr/bin/env python3
"""Make multiplier function with annotations"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Make multiplier function with annotations"""
    def inner(x: float) -> float:
        """Inner function to multiply a number by the multiplier"""
        return x * multiplier
    return inner
