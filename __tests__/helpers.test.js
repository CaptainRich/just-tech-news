// Import the function(s) we need.
const {format_date}   = require( '../utils/helpers' );
const {format_plural} = require( '../utils/helpers' );
const {format_url}    = require( '../utils/helpers' );


////////////////////////////////////////////////////////////////////////////////////////////////
// Verify "Dates" and date formats
test('format_date() returns a date string', () => {
    const date = new Date('2020-03-20 16:12:03');
  
    expect(format_date(date)).toBe('3/20/2020');
  });


  ////////////////////////////////////////////////////////////////////////////////////////////////
  // Test to ensure pluralization is correct.
  test('format_plural() works properly based on count', () => {

    expect( format_plural('Tiger', 2)).toBe("Tigers");

    expect( format_plural('Lion', 1)).toBe("Lion");

  });


  ////////////////////////////////////////////////////////////////////////////////////////////////
  // Test to shorten URLs
  test('format_url() returns a simplified url string', () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');
  
    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
  });
