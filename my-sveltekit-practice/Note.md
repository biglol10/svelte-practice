- SvelteKit

1. whenever we visit any page in our application, by default, it will be coming to us, to the client already rendered on the server, and then the client code is going to take over so that our page can be interactive and we can do things like client side navigation and stuff like that. -> Hydration

- Route

1. +page@.svelte 하면 root layout만 inherit함
2. +page@(frontend).svelte 하면 frontend의 layout를 inherit함 (frontend는 root를 interit하니 결국 둘다 갖게됨)
3. (frontend)/file/[id]/[...path=path]/edit/+page@[...path=path].svelte 의 뜻은 edit페이지는 자신의 layout과 [...path=path]의 layout을 inherit하고 만약에 [...path=path] layout이 +layout@.svelte로 되어있으면 root만 intefit함. 그럼 결국 edit, root layout만 페이지에 표시됨

---

- ENV

1. if value has prefix of PUBLIC\_ then it is available in the client and server
2. if not, it is only available in the server
3. By default it is PUBLIC\_ and you can change in svelte.config.js

```
import { env } from '$env/dynamic/private';
import { API_KEY } from '$env/static/private';

// Evaluated dynamically at runtime
// This means if your environment variables change, the value will be updated at runtime, you don't have to rebuild your app
console.log('env $env/dynamic/private is ', env);
// Static environment variables are evaluated at build time and injected in the code
console.log('env $env/static/private is ', API_KEY);

```

---

- Pre-load

1. data-sveltekit-preload-data="hover" 를 추가함으로써 페이지가 로드되기 전에 데이터를 pre-load를 수행 (데이터랑 페이지코드를 미리 불러옴)

   - body에 default로 잡혀있음
   - tap -> 마우스 클릭

2. data-sveltekit-preload-code="hover" 하면 페이지 코드만 불러옴

   - eager 하면 페이지가 부모 페이지가 로드됐을 때 알아서 불러옴
   - viewport 하면 뷰포트 진입 시 불러옴
   - eager나 viewport는 페이지가 로드됐을 때 link가 DOM에 존재해야 함.

3. data-sveltekit-reload attribute

   - when you click link, the client side navigation will by bypassed and clicking the link will result in refreshing the page. Refreshing or reloading your browser

4. data-sveltekit-noscroll will prevent scrolling to the top of the page when we do client side navigation. You can do it conditionally

---

- Page options

1. in any page that we have, we can export some options to control whether we would like our page to be server side rendered or client side rendered or pre rendered and all of that stuff. (page.ts, page.server.ts 상관없음)

   - ssr=true, csr=false then client side navigation will not be active and your page, browser will be reloaded
   - ssr=true, csr=true is default
   - export const trailingSlash = 'never' (default) -> remove / at the end of url. 'ignore' is not recommended because it can harm SEO (you can do this in api(+server.ts) as well)
   - you can put these in layout as well. (+layout.server.ts). Then all child pages will inherit

2. Statically serve page

   - create +page.ts, export const prerender = true
   - when you build, the page will be pre-rendered and it is going to be served as static HTML
   - you can also pre-render endpoints (random-number/+server.ts)
   - it will run the function only once during the build time when we build our project, and every time we call the endpoint, the same response that was stored during the build time is going to returned
   - when data needs to come from server but you need to server it as static HTML (for-example selling only 5 products page)
     - the post cannot be pre-rendered. When you set pre-render true the apis in the function will also be pre-rendered. Test by deleting post in products/+server.ts and prerender=true in +page.server.ts and then build. (You can see html with products). You can see \_\_data.json in build folder

3. 3. [id] 페이지 pre-rendering

   - +page.server.ts에서 export const prerender = true 하고 npm run build하면 각 제품 api를 콜해서 미리 html파일을 만들어둚
   - products/+server.ts에서 limit=6하고 npm run build하면 6개의 페이지만 미리 생성되고 product id=7을 조회할 시 error 페이지가 나타남
   - 이걸 고치려면 svelte/config.js에서

   ```
   prerender: {
      crawl: true,
      entries: ['/', '/products', '/api/random-number', '/product/7']
   }
   ```

   - entries is array of pages that you prerender or start crawling from (if it is prerenderable)
   - crawl is default true and it will crawl all the pages that are linked to the pages that you specify in the entries array
   - entries: ['*'] means crawl all routes
   - '/product/7' 넣기 싫으면 export const preprender = 'auto'로 하면됨 -> static html이 없을 때 server-side rendering 수행

4. when you need dynamic data in a prerendered page, you can use onMount (of course it is not server side). But try to avoid using this

```
let data = [];
onMount(() => {
   setTimeout(() => {
      data = ['Data 1', 'Data 2', 'Data 3'];
   }, 1000);
});

{#if data.length > 0}
<ul>
   {#each data as product}
      <li>{product.title}</li>
   {/each}
</ul>
{/if}
```

5. $app/environment
   - get information about rendering the page
   - import { browser, building, dev, version } from '$app/environment'
   - browser is true if the page is rendered in the browser
   - building is true if your app is currently being built or prerendered
   - version is by default the timestamp of the build

```
앱을 빌드할 때 로그인이 작동하도록 하려면 이전 섹션에서 추가한 사전 렌더링을 제거해야 합니다.

다음 인스턴스를 제거하면 됩니다:

export const prerender = true;

export const prerender = 'auto';
```

---

- Form actions

1. (not working). use:enhance will do 3 things
   - if you are in login page where we have action, it will update form property and page store (but this will happen only in page that has action, so only in login page)
   - calls invalidateAll
   - if we have redirect, it will not refresh all of your browser
   - if we have error, it will render the nearest error page
