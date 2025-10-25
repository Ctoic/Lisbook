from playwright.sync_api import sync_playwright

def test_chatbot_data_fetch_with_relative_path():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Arrays to store requests
        successful_requests = []
        failed_requests = []
        page.on("requestfinished", lambda request: successful_requests.append(request.url))
        page.on("requestfailed", lambda request: failed_requests.append(request.url))

        # Load the page from the local server
        page.goto("http://localhost:8000/index.html")

        # Click the chatbot button and wait for the window to appear
        page.click("#chatbot-button")
        page.wait_for_selector("#chatbot-window")

        # Give the fetch a moment to complete
        page.wait_for_timeout(1000)

        # Assert that the request to books.json was successful and not failed
        assert any("data/books.json" in url for url in successful_requests), \
            "The request to data/books.json was not successful."
        assert not any("data/books.json" in url for url in failed_requests), \
            "The request to data/books.json failed."

        print("Test passed: Chatbot fetched book data successfully from the local server.")
        browser.close()

if __name__ == "__main__":
    test_chatbot_data_fetch_with_relative_path()
