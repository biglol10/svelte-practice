import type { ParamMatcher } from '@sveltejs/kit';

// check if parameter is an integer
export const match: ParamMatcher = (param) => {
	return Number.isInteger(+param) && +param > 0;
};
