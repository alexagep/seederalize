
  export default {
    async up(queryInterface) {
  
      await queryInterface.bulkInsert(
        'Users',
          [{"id":"2d9d4516-eec7-4cb7-bf5a-dacee4817a6a","created_at":"2023-02-27T18:59:39.329Z","updated_at":"2023-02-27T18:59:39.329Z","first_name":"HPLtVYISIY","last_name":"BkARcjkkbu","image_path":"lXlnuGa8Cx","role":"developer","national_code":"8356227844"}],
        {}
      )
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('Users', null, {})
    },
  }