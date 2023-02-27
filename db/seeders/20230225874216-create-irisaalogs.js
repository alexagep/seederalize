
  export default {
    async up(queryInterface) {
  
      await queryInterface.bulkInsert(
        'IrisaaLogs',
          [{"guard_id":"12fc6e7b-a863-47e4-a38a-a67a273c23d7","user_id":"2d9d4516-eec7-4cb7-bf5a-dacee4817a6a","status":"success","data":"{}","updated_at":"2023-02-27T18:59:39.329Z","created_at":"2023-02-27T18:59:39.329Z","id":"ddd894a3-86e9-4e1b-9bc0-281c0cfa9b5c"}],
        {}
      )
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('IrisaaLogs', null, {})
    },
  }