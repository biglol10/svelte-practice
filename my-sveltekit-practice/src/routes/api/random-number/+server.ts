import { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	return new Response(String(Math.random() * 10)); // result should be string
};

export const prerender = true;
