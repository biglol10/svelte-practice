- Route

1. +page@.svelte 하면 root layout만 inherit함
2. +page@(frontend).svelte 하면 frontend의 layout를 inherit함 (frontend는 root를 interit하니 결국 둘다 갖게됨)
3. (frontend)/file/[id]/[...path=path]/edit/+page@[...path=path].svelte 의 뜻은 edit페이지는 자신의 layout과 [...path=path]의 layout을 inherit하고 만약에 [...path=path] layout이 +layout@.svelte로 되어있으면 root만 intefit함. 그럼 결국 edit, root layout만 페이지에 표시됨

- ENV

1. if value has prefix of PUBLIC\_ then it is available in the client and server
2. if not, it is only available in the server
3. By default it is PUBLIC\_ and you can change in svelte.config.js
