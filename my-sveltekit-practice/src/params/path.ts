import type { ParamMatcher } from '@sveltejs/kit';

// when you need path to have more than 1 segment
// file/zxc/awer/asdf
export const match: ParamMatcher = (param) => {
	return param.split('/').length > 1;
};
