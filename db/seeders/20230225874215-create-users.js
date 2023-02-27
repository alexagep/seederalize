
  export default {
    async up(queryInterface) {
  
      await queryInterface.bulkInsert(
        'Users',
          [{"updated_at":"2023-02-27T11:11:01.261Z","id":"97b0deee-f841-4dbd-814a-4c7f17f2722a","created_at":"2023-02-27T11:11:01.261Z","image_path":"nSUTjwWLT6","first_name":"gxgBdDwQRY","last_name":"QzxAHtOMmu","role":"maintainer","national_code":"4031559532"}],
        {}
      )
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('Users', null, {})
    },
  }