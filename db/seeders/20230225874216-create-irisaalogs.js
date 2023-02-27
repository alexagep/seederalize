
  export default {
    async up(queryInterface) {
  
      await queryInterface.bulkInsert(
        'IrisaaLogs',
          [{"id":"e88814b5-e95b-446d-908d-90563d0d9b19","guard_id":"641e38ae-0dca-449f-8d60-d095ad02ae91","user_id":"97b0deee-f841-4dbd-814a-4c7f17f2722a","status":"success","data":"{}","updated_at":"2023-02-27T11:11:01.260Z","created_at":"2023-02-27T11:11:01.260Z"}],
        {}
      )
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('IrisaaLogs', null, {})
    },
  }