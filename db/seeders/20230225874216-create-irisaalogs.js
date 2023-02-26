
  export default {
    async up(queryInterface) {
  
      await queryInterface.bulkInsert(
        'IrisaaLogs',
          [{"id":"04549ef7-202c-47ec-a67c-2290d7e3ebb5","guard_id":"f36471e4-d70a-4ff2-b440-82e5774fa66a","user_id":"80c287c5-9f80-44ee-823a-b45588ab3d2a","status":"success","data":"{}","updated_at":"2023-02-25T13:34:07.223Z","created_at":"2023-02-25T13:34:07.223Z"},{"id":"04656cc8-5fef-4386-b2cc-5d3e81e77a73","guard_id":"f36471e4-d70a-4ff2-b440-82e5774fa66a","user_id":"78f47d70-e1ce-43f0-b3aa-cdbc522c495f","status":"success","data":"{}","updated_at":"2023-02-25T13:34:07.223Z","created_at":"2023-02-25T13:34:07.223Z"},{"id":"7bbf77ef-00bb-46ba-8a53-4d45cb3be2af","guard_id":"bfe8333d-aa0d-46e8-bce6-27bbfb4a6bf7","user_id":"6c14ee7f-5bf6-40f0-a6f8-1485dd0043d2","status":"success","data":"{}","updated_at":"2023-02-25T13:34:07.223Z","created_at":"2023-02-25T13:34:07.223Z"},{"id":"e3963d97-0cc0-4fda-829f-35e85e5f87a7","guard_id":"bfe8333d-aa0d-46e8-bce6-27bbfb4a6bf7","user_id":"78f47d70-e1ce-43f0-b3aa-cdbc522c495f","status":"error","data":"{}","updated_at":"2023-02-25T13:34:07.223Z","created_at":"2023-02-25T13:34:07.223Z"},{"id":"39b59fbe-3259-4eb0-b103-157de7db9463","guard_id":"0ed58a57-5a03-4e26-b5b1-4c1df29c120a","user_id":"5dd33cfd-a120-4576-90ec-fd6bc63cdc41","status":"error","data":"{}","updated_at":"2023-02-25T13:34:07.223Z","created_at":"2023-02-25T13:34:07.223Z"}],
        {}
      )
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('IrisaaLogs', null, {})
    },
  }