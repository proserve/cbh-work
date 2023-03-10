# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.
## Your Breakdown Here:
1. **Title**: Database to support facility's Agent Custom Id agent_id
- **Description**: As a Backend developer I should be able to manage (insert/read) the facility's Agent Custom Id on the database agent_id
- **Acceptance Criteria**: 
  - A new column in the agent-Facility relationship table named agent_custom_id should exist
  - Can not insert the same agent_custom_id with the same facility_id
  - Database schema documentation is updatedagent_id
- **Details**: 
   - Create a new database column on the agent-Facility relationship table named agent_custom_id
   - the new column should be created in the agent-Facility relationship table because multiple facilities can hire the same agent
   - A database migration should be written to make the change
   - As different facilities can provide the same custom agent Ids (maybe they use incremental Ids) The combination agent_custom_id + facility_Id should unique
   - An Integration test should be written to verify the new column and the index creation
   - Update Database schema documentation agent_id
- **Estimation**: 2 story points (complexity: low)


2. **Title**: Agent/facility REST APIs to support custom Agent Id field agent_id
- **Description**: As a Frontend developer I should be able to fetch/update/create Facility's agent custom_id agent_id
- **Details**: 
   - Update Create/update Facility's agent API to support agent_custom_id, which should return 409 in case of duplicated custom_id
   - Update Fetch/view Facility's agents API to return agent_custom_id field
   - Unit/integration tests to be written to verify new acceptance criteria
   - Update API documentation agent_id

- **Acceptance Criteria**:
   - A new field name custom_agent_Id should be sent with the API
   - API should return 408 when inserting/updating existent custom_agent_Id
   - API documentation should be updatedagent_id

- **Estimation**: 2 story points (complexity: low)

3. **Title**: Frontend should support managing the new agent custom_id  agent_id
- **Description**: As Facility's Operator I should be able to assign a custom Id to agents agent_id
- **Details**: 
   - Update View Agent Details UI to show the new custom_agent_Id field
   - Update Edit Agent Details UI to allow editing the new custom_agent_Id field
   - Handle conflict errors on UI
   - Update End-end test/integration/unit testsagent_id
   
- **Acceptance Criteria**:
   - New change to respect UI guidelines 
   - New changes to respect UI design provided by the design team
   - Given that the User inserted a duplicated Id, the UI should show an error 
   - User should be able to Edit/view custom_agent_Idagent_id

- **Estimation**: 3 story points (complexity: low)


4. **Title**: Update Report Generation to include custom agent Id field agent_id
- **Description**: As Facility's Operator I should be able to see the assigned custom agent Id in my reports  agent_id
- **Details**: 
   - Update `getShiftsByFacility` function to return the custom agent Id
   - Update `generateReport` function to return a field named Facility_Agent_Id (keeping the internal Id different column in the case of a support ticket, the facility can communicate with our internal Id)
   - Update PDF report to render the new filed
   - Write unit/integration tests
   
- **Acceptance Criteria**:
   - Facility's Operator should be able to see the custom_agent_Id field in shifts reportagent_id
   - 
- **Estimation**: 3 story points (complexity: low)
