Feature: Update Book API
Scenario: Update a book with invalid ID
      Given the API base URL is "http://localhost:7081"
      And a book exists with id 989
      When I send a PUT request to "/api/books/989" with the following payload
      """
    {
      "id": 989,
      "title": "null",
      "author": "null"
    }
    """
      Then the response status code should be 404
      And the response body should contain invalid id error message:
       """
       Book not found
        """
