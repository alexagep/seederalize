
  export default {
    async up(queryInterface) {
  
      await queryInterface.bulkInsert(
        'Users',
          [{"id":"20bb59a5-cde0-49be-84d7-82b53f486186","created_at":"2023-02-26T20:43:33.853Z","updated_at":"2023-02-26T20:43:33.853Z","first_name":"QrkrGBeGrQ","last_name":"XMybCFQStH","image_path":"96HeDZlaAt","role":"guard","national_code":"6606824069"},{"id":"17d3a462-6c85-4abd-9f87-4bad40f1e374","created_at":"2023-02-26T20:43:33.853Z","updated_at":"2023-02-26T20:43:33.853Z","first_name":"qXgpDLyEbQ","last_name":"typKfdcRXa","image_path":"6DVtjBkHZk","role":"maintainer","national_code":"9238328688"},{"id":"efc9fc3d-f494-43ef-b56e-4703b55598b0","created_at":"2023-02-26T20:43:33.853Z","updated_at":"2023-02-26T20:43:33.853Z","first_name":"HVZRvhRiNF","last_name":"eVymjcmZTK","image_path":"cXkW5gzNZs","role":"admin","national_code":"8938284888"},{"id":"e2743645-33b2-48bf-b9dc-6806f44aeb75","created_at":"2023-02-26T20:43:33.853Z","updated_at":"2023-02-26T20:43:33.853Z","first_name":"xxNqMyFnRe","last_name":"gHmGSDzAIO","image_path":"aOhofxNKSZ","role":"guard","national_code":"6059231866"},{"id":"90baa397-cbe7-4c66-895a-05bd139bcca1","created_at":"2023-02-26T20:43:33.853Z","updated_at":"2023-02-26T20:43:33.853Z","first_name":"nZaCLppskY","last_name":"vhefYoXCvO","image_path":"BByy524XEn","role":"guard","national_code":"1252967672"}],
        {}
      )
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('Users', null, {})
    },
  }