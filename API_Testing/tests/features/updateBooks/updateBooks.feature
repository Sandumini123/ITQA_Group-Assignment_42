Feature: Update Book API

  Scenario: Successfully update a book
    Given the API base URL is "http://localhost:7081"
    And a book exists with id 73
    When I send a PUT request to "/api/books/73" with the following payload
  """
  {
    "id": 73,
    "title": "Jane11",
    "author": "John13"
  }
  """
    Then the response status code should be 200
    And the response body should contain:
  """
  {
     "id": 73,
    "title": "Jane1",
    "author": "John3"
  }
  """
  Scenario: update a book with invalid payload
    Given the API base URL is "http://localhost:7081"
    And a book exists with id 73
    When I send a PUT request to "/api/books/73" with the following payload
    """
    {
      "id": 73,
      "title": null,
      "author": null
    }
    """
    Then the response status code should be 400
    And the response body should contain error message:
    """
  Mandatory parameters should not be null

"""
    # Scenario: Update a book with invalid ID
    #   Given the API base URL is "http://localhost:7081"
    #   And a book exists with id 989
    #   When I send a PUT request to "/api/books/989" with the following payload
    #   """
    # {
    #   "id": 989,
    #   "title": "null",
    #   "author": "null"
    # }
    # """
    #   Then the response status code should be 404
    #   And the response body should contain invalid id error message:
    #    """
    #    Book not found
    #     """


  Scenario: : Update a book as a user
    Given the API base URL is "http://localhost:7081"
    And a book exists with id 74
    When I send a PUT request to "/api/books/74" as a user with the following payload
  """
  {
    "id": 74,
    "title": "Jansh",
    "author": "John smith"
  }
  """
    Then the response status code should be 403
    And the response body should contain an authorization error message:
  """
  User is not permitted.
   """

  Scenario: Validate that numbers are not accepted in title and author fields (BUG EXPECTED)
    Given the API base URL is "http://localhost:7081"
    And a book exists with id 74
    When I send a PUT request to "/api/books/74" with the following payload
    """
    {
      "id": 74,
      "title": 126778,
      "author": 6678
    }
    """
    Then the response status code should be 400

# Scenario: validate with empty string for author and title field
#   Given the API base URL is "http://localhost:7081"
#   And a book exists with id 76
#   When I send a PUT request to "/api/books/76" with the following payload
#     """
#     {
#       "id": 76,
#       "title": "",
#       "author": ""
#     }
#     """
#   Then the response status code should be 400