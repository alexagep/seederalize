
  export default {
    async up(queryInterface) {
  
      await queryInterface.bulkInsert(
        'Users',
          [{"updated_at":"2023-02-25T13:34:07.214Z","id":"80c287c5-9f80-44ee-823a-b45588ab3d2a","created_at":"2023-02-25T13:34:07.214Z","image_path":"Uq6E3ECudU","first_name":"MSTuGBXUSE","last_name":"RoPzwcKjZd","role":"hr","national_code":"1021344451"},{"updated_at":"2023-02-25T13:34:07.214Z","id":"78f47d70-e1ce-43f0-b3aa-cdbc522c495f","created_at":"2023-02-25T13:34:07.214Z","image_path":"rPhscE6uEO","first_name":"XmaCRwgzKD","last_name":"PsNQqJEscR","role":"maintainer","national_code":"2316953283"},{"updated_at":"2023-02-25T13:34:07.214Z","id":"6c14ee7f-5bf6-40f0-a6f8-1485dd0043d2","created_at":"2023-02-25T13:34:07.214Z","image_path":"kgda0fmAD8","first_name":"RkgWTnxlQU","last_name":"sLMnUmSJDN","role":"hr","national_code":"1508019877"},{"updated_at":"2023-02-25T13:34:07.214Z","id":"5dd33cfd-a120-4576-90ec-fd6bc63cdc41","created_at":"2023-02-25T13:34:07.214Z","image_path":"Y3NXdutmfi","first_name":"XPlBtZBUrd","last_name":"uUZjpNURjv","role":"hr","national_code":"9514459194"},{"updated_at":"2023-02-25T13:34:07.214Z","id":"14c5ee6f-ff86-4b11-8e6f-0ba346347263","created_at":"2023-02-25T13:34:07.214Z","image_path":"OvgeKcJ3kk","first_name":"yudjneThLw","last_name":"oCGSzhWPgM","role":"developer","national_code":"7492131556"}],
        {}
      )
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('Users', null, {})
    },
  }