# Chapter 10: Statistical Functions in SQL

## Introduction

A SQL database isn't usually the first tool a data analyst chooses when performing statistical analysis that requires more than just calculating sums and averages. Typically, the software of choice would be full-featured statistics packages, such as SPSS or SAS, the programming languages R or Python, or even Excel. However, standard ANSI SQL, including PostgreSQL's implementation, offers a handful of powerful stats functions that reveal a lot about your data without having to export your data set to another program.

In this chapter, we'll explore these SQL stats functions along with guidelines on when to use them. Statistics is a vast subject worthy of its own book, so we'll only skim the surface here. Nevertheless, you'll learn how to apply high-level statistical concepts to help you derive meaning from your data using a new data set from the U.S. Census Bureau. You'll also learn to use SQL to create comparisons using rankings and rates with FBI crime data as our subject.

## Creating a Census Stats Table

Let's return to one of my favorite data sources, the U.S. Census Bureau. In Chapters 4 and 5, you used the 2010 Decennial Census to import data and perform basic math and stats. This time you'll use county data points compiled from the 2011–2015 American Community Survey (ACS) 5-Year Estimates, a separate survey administered by the Census Bureau.

### Understanding the Decennial Census vs. the American Community Survey

Each U.S. Census data product has its own methodology. The Decennial Census is a full count of the U.S. population, conducted every 10 years via a form mailed to every household in the country. One of its primary purposes is to determine the number of seats each state holds in the U.S. House of Representatives. In contrast, the ACS is an ongoing annual survey of about 3.5 million U.S. households. It enquires into details about income, education, employment, ancestry, and housing. Private-sector and public-sector organizations alike use ACS data to track trends and make various decisions.

Currently, the Census Bureau packages ACS data into two releases: a 1-year data set that provides estimates for geographies with populations of 20,000 or more, and a 5-year data set that includes all geographies. Because it's a survey, ACS results are estimates and have a margin of error, which I've omitted for brevity but which you'll see included in a full ACS data set.

### Creating the Table

```sql
CREATE TABLE acs_2011_2015_stats (
    geoid varchar(14) CONSTRAINT geoid_key PRIMARY KEY,
    county varchar(50) NOT NULL,
    st varchar(20) NOT NULL,
    pct_travel_60_min numeric(5,3) NOT NULL,
    pct_bachelors_higher numeric(5,3) NOT NULL,
    pct_masters_higher numeric(5,3) NOT NULL,
    median_hh_income integer,
    CHECK (pct_masters_higher <= pct_bachelors_higher)
);

COPY acs_2011_2015_stats
FROM 'C:\YourDirectory\acs_2011_2015_stats.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');

SELECT * FROM acs_2011_2015_stats;
```

**Key Points:**
- The `acs_2011_2015_stats` table has seven columns
- The first three columns include a unique `geoid` that serves as the primary key, the name of the county, and the state name `st`
- The next four columns display three percentages derived for each county from raw data in the ACS release, plus one more economic indicator

**Column Descriptions:**
- `pct_travel_60_min`: The percentage of workers ages 16 and older who commute more than 60 minutes to work
- `pct_bachelors_higher`: The percentage of people ages 25 and older whose level of education is a bachelor's degree or higher. (In the United States, a bachelor's degree is usually awarded upon completing a four-year college education.)
- `pct_masters_higher`: The percentage of people ages 25 and older whose level of education is a master's degree or higher. (In the United States, a master's degree is the first advanced degree earned after completing a bachelor's degree.)
- `median_hh_income`: The county's median household income in 2015 inflation-adjusted dollars. As you learned in Chapter 5, a median value is the midpoint in an ordered set of numbers, where half the values are larger than the midpoint and half are smaller. Because averages can be skewed by a few very large or very small values, government reporting on economic data, such as income, tends to use medians. In this column, we omit the NOT NULL constraint because one county had no data reported.

**CHECK Constraint:**
- We include the CHECK constraint you learned in Chapter 7 to check that the figures for the bachelor's degree are equal to or higher than those for the master's degree, because in the United States, a bachelor's degree is earned before or concurrently with a master's degree. A county showing the opposite could indicate data imported incorrectly or a column mislabeled.

**Row Count:** Upon import, there are 3,142 rows imported, each corresponding to a county surveyed in this Census release.

## Measuring Correlation with corr(Y, X)

Researchers often want to understand the relationships between variables, and one such measure of relationships is correlation. In this section, we'll use the `corr(Y, X)` function to measure correlation and investigate what relationship exists, if any, between the percentage of people in a county who've attained a bachelor's degree and the median household income in that county. We'll also determine whether, according to our data, a better-educated population typically equates to higher income and how strong the relationship between education level and income is if it does.

### Understanding Correlation

**The Pearson Correlation Coefficient:**
First, some background. The Pearson correlation coefficient (generally denoted as r) is a measure for quantifying the strength of a linear relationship between two variables. It shows the extent to which an increase or decrease in one variable correlates to a change in another variable. The r values fall between −1 and 1. Either end of the range indicates a perfect correlation, whereas values near zero indicate a random distribution with no correlation.

**Positive Correlation:**
A positive r value indicates a direct relationship: as one variable increases, the other does too. When graphed on a scatterplot, the data points representing each pair of values in a direct relationship would slope upward from left to right.

**Negative Correlation:**
A negative r value indicates an inverse relationship: as one variable increases, the other decreases. Dots representing an inverse relationship would slope downward from left to right on a scatterplot.

**Interpreting Correlation Coefficients:**

| Correlation coefficient (+/−) | What it could mean |
|-------------------------------|-------------------|
| 0 | No relationship |
| 0.1 to 0.29 | Weak relationship |
| 0.3 to 0.59 | Moderate relationship |
| 0.6 to 0.99 | Strong to nearly perfect relationship |
| 1 | Perfect relationship |

**Note:** Different statisticians may offer different interpretations.

### Using corr(Y, X) Function

In standard ANSI SQL and PostgreSQL, we calculate the Pearson correlation coefficient using `corr(Y, X)`. It's one of several binary aggregate functions in SQL and is so named because these functions accept two inputs.

**Understanding Y and X:**
- In binary aggregate functions, the input Y is the dependent variable whose variation depends on the value of another variable
- X is the independent variable whose value doesn't depend on another variable

**Important Note:** Even though SQL specifies the Y and X inputs for the `corr()` function, correlation calculations don't distinguish between dependent and independent variables. Switching the order of inputs in `corr()` produces the same result. However, for convenience and readability, these examples order the input variables according to dependent and independent.

### Example: Education and Income Correlation

We'll use the `corr(Y, X)` function to discover the relationship between education level and income:

```sql
SELECT corr(median_hh_income, pct_bachelors_higher)
AS bachelors_income_r
FROM acs_2011_2015_stats;
```

**Result:** Your result should be an r value of just above 0.68 given as the floating-point double precision data type:
```
bachelors_income_r
------------------
0.682185675451399
```

**Analysis:**
- This positive r value indicates that as a county's educational attainment increases, household income tends to increase
- The relationship isn't perfect, but the r value shows the relationship is fairly strong
- We can visualize this pattern by plotting the variables on a scatterplot
- Each data point represents one U.S. county; the data point's position on the x-axis shows the percentage of the population ages 25 and older that have a bachelor's degree or higher
- The data point's position on the y-axis represents the county's median household income

**Visual Pattern:** Although most of the data points are grouped together in the bottom-left corner of the graph, they do generally slope upward from left to right. Also, the points spread out rather than strictly follow a straight line. If they were in a straight line sloping up from left to right, the r value would be 1, indicating a perfect positive linear relationship.

### Checking Additional Correlations

Now let's calculate the correlation coefficients for the remaining variable pairs:

```sql
SELECT
    round(
        corr(median_hh_income, pct_bachelors_higher)::numeric, 2
    ) AS bachelors_income_r,
    round(
        corr(pct_travel_60_min, median_hh_income)::numeric, 2
    ) AS income_travel_r,
    round(
        corr(pct_travel_60_min, pct_bachelors_higher)::numeric, 2
    ) AS bachelors_travel_r
FROM acs_2011_2015_stats;
```

**How it works:**
- This time we'll make the output more readable by rounding off the decimal values
- We'll do this by wrapping the `corr(Y, X)` function inside SQL's `round()` function, which takes two inputs: the numeric value to be rounded and an integer value indicating the number of decimal places to round the first value
- If the second parameter is omitted, the value is rounded to the nearest whole integer
- Because `corr(Y, X)` returns a floating-point value by default, we'll change it to the numeric type using the `::` notation you learned in Chapter 3

**Results:**
```
bachelors_income_r | income_travel_r | bachelors_travel_r
-------------------|-----------------|-------------------
0.68               | 0.05            | -0.14
```

**Analysis:**
- The `bachelors_income_r` value is 0.68, which is the same as our first run but rounded to two decimal places
- Compared to `bachelors_income_r`, the other two correlations are weak
- The `income_travel_r` value shows that the correlation between income and the percentage of those who commute more than an hour to work is practically zero. This indicates that a county's median household income bears little connection to how long it takes people to get to work
- The `bachelors_travel_r` value shows that the correlation of bachelor's degrees and commuting is also low at -0.14. The negative value indicates an inverse relationship: as education increases, the percentage of the population that travels more than an hour to work decreases. Although this is interesting, a correlation coefficient that is this close to zero indicates a weak relationship

### Important Caveats

When testing for correlation, we need to note some caveats:

1. **Correlation doesn't imply causality:** Even a strong correlation does not imply causality. We can't say that a change in one variable causes a change in the other, only that the changes move together. For verification, do a Google search on "correlation and causality." Many variables correlate well but have no meaning. (See http://www.tylervigen.com/spurious-correlations for examples of correlations that don't prove causality, including the correlation between divorce rate in Maine and margarine consumption.)

2. **Statistical significance:** Correlations should be subject to testing to determine whether they're statistically significant. Those tests are beyond the scope of this book but worth studying on your own.

**Conclusion:** Nevertheless, the SQL `corr(Y, X)` function is a handy tool for quickly checking correlations between variables.

## Predicting Values with Regression Analysis

Researchers not only want to understand relationships between variables; they also want to predict values using available data. For example, let's say 30 percent of a county's population has a bachelor's degree or higher. Given the trend in our data, what would we expect that county's median household income to be? Likewise, for each percent increase in education, how much increase, on average, would we expect in income?

We can answer both questions using linear regression. Simply put, the regression method finds the best linear equation, or straight line, that describes the relationship between an independent variable (such as education) and a dependent variable (such as income). Standard ANSI SQL and PostgreSQL include functions that perform linear regression.

### Understanding Linear Regression

The straight line running through the middle of all the data points is called the **least squares regression line**, which approximates the "best fit" for a straight line that best describes the relationship between the variables. The equation for the regression line is like the slope-intercept formula you might remember from high school math but written using differently named variables: **Y = bX + a**.

**Formula Components:**
- **Y**: The predicted value, which is also the value on the y-axis, or dependent variable
- **b**: The slope of the line, which can be positive or negative. It measures how many units the y-axis value will increase or decrease for each unit of the x-axis value
- **X**: Represents a value on the x-axis, or independent variable
- **a**: The y-intercept, the value at which the line crosses the y-axis when the X value is zero

### Calculating Slope and Intercept

Let's apply this formula using SQL. Earlier, we questioned what the expected median household income in a county would be if the percentage of people with a bachelor's degree or higher in that county was 30 percent.

In our scatterplot, the percentage with bachelor's degrees falls along the x-axis, represented by X in the calculation. Let's plug that value into the regression line formula in place of X:
```
Y = b(30) + a
```

To calculate Y, which represents the predicted median household income, we need the line's slope, b, and the y-intercept, a. To get these values, we'll use the SQL functions `regr_slope(Y, X)` and `regr_intercept(Y, X)`:

```sql
SELECT
    round(
        regr_slope(median_hh_income, pct_bachelors_higher)::numeric, 2
    ) AS slope,
    round(
        regr_intercept(median_hh_income, pct_bachelors_higher)::numeric, 2
    ) AS y_intercept
FROM acs_2011_2015_stats;
```

**How it works:**
- Using the `median_hh_income` and `pct_bachelors_higher` variables as inputs for both functions, we'll set the resulting value of the `regr_slope(Y, X)` function as `slope` and the output for the `regr_intercept(Y, X)` function as `y_intercept`

**Results:**
```
slope   | y_intercept
--------|------------
926.95  | 27901.15
```

**Analysis:**
- The slope value shows that for every one-unit increase in bachelor's degree percentage, we can expect a county's median household income will increase by 926.95. Slope always refers to change per one unit of X
- The y_intercept value shows that when the regression line crosses the y-axis, where the percentage with bachelor's degrees is at 0, the y-axis value is 27901.15

### Making Predictions

Now let's plug both values into the equation to get the Y value:
```
Y = 926.95(30) + 27901.15
Y = 55709.65
```

**Prediction:** Based on our calculation, in a county in which 30 percent of people age 25 and older have a bachelor's degree or higher, we can expect a median household income in that county to be about $55,710.

**Important Notes:**
- Of course, our data includes counties whose median income falls above and below that predicted value, but we expect this to be the case because our data points in the scatterplot don't line up perfectly along the regression line
- Recall that the correlation coefficient we calculated was 0.68, indicating a strong but not perfect relationship between education and income
- Other factors probably contributed to variations in income as well

## Finding the Effect of an Independent Variable with r-squared

Earlier in the chapter, we calculated the correlation coefficient, r, to determine the direction and strength of the relationship between two variables. We can also calculate the extent that the variation in the x (independent) variable explains the variation in the y (dependent) variable by squaring the r value to find the coefficient of determination, better known as **r-squared**.

### Understanding r-squared

An r-squared value is between zero and one and indicates the percentage of the variation that is explained by the independent variable. For example, if r-squared equals 0.1, we would say that the independent variable explains 10 percent of the variation in the dependent variable, or not much at all.

### Calculating r-squared

To find r-squared, we use the `regr_r2(Y, X)` function in SQL. Let's apply it to our education and income variables:

```sql
SELECT round(
    regr_r2(median_hh_income, pct_bachelors_higher)::numeric, 3
) AS r_squared
FROM acs_2011_2015_stats;
```

**How it works:**
- This time we'll round off the output to the nearest thousandth place and set the result to `r_squared`

**Result:**
```
r_squared
---------
0.465
```

**Analysis:**
- The r-squared value of 0.465 indicates that about 47 percent of the variation in median household income in a county can be explained by the percentage of people with a bachelor's degree or higher in that county
- What explains the other 53 percent of the variation in household income? Any number of factors could explain the rest of the variation, and statisticians will typically test numerous combinations of variables to determine what they are

### Important Considerations

But before you use these numbers in a headline or presentation, it's worth revisiting the following points:

1. **Correlation doesn't prove causality:** For verification, do a Google search on "correlation and causality." Many variables correlate well but have no meaning. (See http://www.tylervigen.com/spurious-correlations for examples of correlations that don't prove causality, including the correlation between divorce rate in Maine and margarine consumption.) Statisticians usually perform significance testing on the results to make sure values are not simply the result of randomness.

2. **Additional tests required:** Statisticians also apply additional tests to data before accepting the results of a regression analysis, including whether the variables follow the standard bell curve distribution and meet other criteria for a valid result.

**Conclusion:** Given these factors, SQL's statistics functions are useful as a preliminary survey of your data before doing more rigorous analysis. If your work involves statistics, a full study on performing regression is worthwhile.

## Creating Rankings with SQL

Rankings make the news often. You'll see them used anywhere from weekend box office charts to a sports team's league standings. You've already learned how to order query results based on values in a column, but SQL lets you go further and create numbered rankings. Rankings are useful for data analysis in several ways, such as tracking changes over time if you have several years' worth of data. You can also simply use a ranking as a fact on its own in a report. Let's explore how to create rankings using SQL.

### Understanding Window Functions

Standard ANSI SQL includes several ranking functions, but we'll just focus on two: `rank()` and `dense_rank()`. Both are **window functions**, which perform calculations across sets of rows we specify using the OVER clause. Unlike aggregate functions, which group rows while calculating results, window functions present results for each row in the table.

### Ranking with rank() and dense_rank()

The difference between `rank()` and `dense_rank()` is the way they handle the next rank value after a tie: `rank()` includes a gap in the rank order, but `dense_rank()` does not. This concept is easier to understand in action, so let's look at an example.

**Example: Widget Companies**

Consider a Wall Street analyst who covers the highly competitive widget manufacturing market. The analyst wants to rank companies by their annual output:

```sql
CREATE TABLE widget_companies (
    id bigserial,
    company varchar(30) NOT NULL,
    widget_output integer NOT NULL
);

INSERT INTO widget_companies (company, widget_output)
VALUES
('Morse Widgets', 125000),
('Springfield Widget Masters', 143000),
('Best Widgets', 196000),
('Acme Inc.', 133000),
('District Widget Inc.', 201000),
('Clarke Amalgamated', 620000),
('Stavesacre Industries', 244000),
('Bowers Widget Emporium', 201000);

SELECT
    company,
    widget_output,
    rank() OVER (ORDER BY widget_output DESC),
    dense_rank() OVER (ORDER BY widget_output DESC)
FROM widget_companies;
```

**How it works:**
- Notice the syntax in the SELECT statement that includes `rank()` and `dense_rank()`
- After the function names, we use the OVER clause and in parentheses place an expression that specifies the "window" of rows the function should operate on
- In this case, we want both functions to work on all rows of the `widget_output` column, sorted in descending order

**Results:**
```
company                    | widget_output | rank | dense_rank
---------------------------|---------------|------|----------
Clarke Amalgamated         | 620000        | 1    | 1
Stavesacre Industries      | 244000        | 2    | 2
Bowers Widget Emporium     | 201000        | 3    | 3
District Widget Inc.       | 201000        | 3    | 3
Best Widgets              | 196000        | 5    | 4
Springfield Widget Masters | 143000        | 6    | 5
Acme Inc.                  | 133000        | 7    | 6
Morse Widgets              | 125000        | 8    | 7
```

**Understanding the Difference:**
- The columns produced by the `rank()` and `dense_rank()` functions show each company's ranking based on the `widget_output` value from highest to lowest, with Clarke Amalgamated at number one
- To see how `rank()` and `dense_rank()` differ, check the fifth row listing, Best Widgets
- With `rank()`, Best Widgets is the fifth highest ranking company, showing there are four companies with more output and there is no company ranking in fourth place, because `rank()` allows a gap in the order when a tie occurs
- In contrast, `dense_rank()`, which doesn't allow a gap in the rank order, reflects the fact that Best Widgets has the fourth highest output number regardless of how many companies produced more. Therefore, Best Widgets ranks in fourth place using `dense_rank()`

**Recommendation:** Both ways of handling ties have merit, but in practice `rank()` is used most often. It's also what I recommend using, because it more accurately reflects the total number of companies ranked, shown by the fact that Best Widgets has four companies ahead of it in total output, not three.

### Ranking Within Subgroups with PARTITION BY

The ranking we just did was a simple overall ranking based on widget output. But sometimes you'll want to produce ranks within groups of rows in a table. For example, you might want to rank government employees by salary within each department or rank movies by box office earnings within each genre.

To use window functions in this way, we'll add PARTITION BY to the OVER clause. A PARTITION BY clause divides table rows according to values in a column we specify.

**Example: Store Sales by Category**

Here's an example using made-up data about grocery stores:

```sql
CREATE TABLE store_sales (
    store varchar(30),
    category varchar(30) NOT NULL,
    unit_sales bigint NOT NULL,
    CONSTRAINT store_category_key PRIMARY KEY (store, category)
);

INSERT INTO store_sales (store, category, unit_sales)
VALUES
('Broders', 'Cereal', 1104),
('Wallace', 'Ice Cream', 1863),
('Broders', 'Ice Cream', 2517),
('Cramers', 'Ice Cream', 2112),
('Broders', 'Beer', 641),
('Cramers', 'Cereal', 1003),
('Cramers', 'Beer', 640),
('Wallace', 'Cereal', 980),
('Wallace', 'Beer', 988);

SELECT
    category,
    store,
    unit_sales,
    rank() OVER (PARTITION BY category ORDER BY unit_sales DESC)
FROM store_sales;
```

**How it works:**
- In the table, each row includes a store's product category and sales for that category
- The final SELECT statement creates a result set showing how each store's sales ranks within each category
- The new element is the addition of PARTITION BY in the OVER clause
- In effect, the clause tells the program to create rankings one category at a time, using the store's unit sales in descending order

**Results:**
```
category  | store    | unit_sales | rank
----------|----------|------------|------
Beer      | Wallace  | 988        | 1
Beer      | Broders  | 641        | 2
Beer      | Cramers  | 640        | 3
Cereal    | Broders  | 1104       | 1
Cereal    | Cramers  | 1003       | 2
Cereal    | Wallace  | 980        | 3
Ice Cream | Broders  | 2517       | 1
Ice Cream | Cramers  | 2112       | 2
Ice Cream | Wallace  | 1863       | 3
```

**Analysis:**
- Notice that category names are ordered and grouped in the category column as a result of PARTITION BY in the OVER clause
- Rows for each category are ordered by category unit sales with the rank column displaying the ranking
- Using this table, we can see at a glance how each store ranks in a food category. For instance, Broders tops sales for cereal and ice cream, but Wallace wins in the beer category

**Other Applications:** You can apply this concept to many other scenarios: for example, for each auto manufacturer, finding the vehicle with the most consumer complaints; figuring out which month had the most rainfall in each of the last 20 years; finding the team with the most wins against left-handed pitchers; and so on.

**Note:** SQL offers additional window functions. Check the official PostgreSQL documentation at https://www.postgresql.org/docs/current/static/tutorial-window.html for an overview of window functions, and check https://www.postgresql.org/docs/current/static/functions-window.html for a listing of window functions.

## Calculating Rates for Meaningful Comparisons

As helpful and interesting as they are, rankings based on raw counts aren't always meaningful; in fact, they can actually be misleading.

### The Problem with Raw Counts

Consider this example of crime statistics: according to the U.S. Federal Bureau of Investigation (FBI), in 2015, New York City reported about 130,000 property crimes, which included burglary, larceny, motor vehicle thefts, and arson. Meanwhile, Chicago reported about 80,000 property crimes the same year.

So, you're more likely to find trouble in New York City, right? Not necessarily. In 2015, New York City had more than 8 million residents, whereas Chicago had 2.7 million. Given that context, just comparing the total numbers of property crimes in the two cities isn't very meaningful.

### The Solution: Calculating Rates

A more accurate way to compare these numbers is to turn them into rates. Analysts often calculate a rate per 1,000 people, or some multiple of that number, for apples-to-apples comparisons. For the property crimes in this example, the math is simple: divide the number of offenses by the population and then multiply that quotient by 1,000.

**Formula:**
```
(Number of offenses / Population) × 1,000 = Rate per 1,000 people
```

**Example:** If a city has 80 vehicle thefts and a population of 15,000, you can calculate the rate of vehicle thefts per 1,000 people as follows:
```
(80 / 15,000) × 1,000 = 5.3 vehicle thefts per thousand residents
```

### Creating the FBI Crime Data Table

This is easy math with SQL, so let's try it using select city-level data compiled from the FBI's 2015 Crime in the United States report:

```sql
CREATE TABLE fbi_crime_data_2015 (
    st varchar(20),
    city varchar(50),
    population integer,
    violent_crime integer,
    property_crime integer,
    burglary integer,
    larceny_theft integer,
    motor_vehicle_theft integer,
    CONSTRAINT st_city_key PRIMARY KEY (st, city)
);

COPY fbi_crime_data_2015
FROM 'C:\YourDirectory\fbi_crime_data_2015.csv'
WITH (FORMAT CSV, HEADER, DELIMITER ',');

SELECT * FROM fbi_crime_data_2015
ORDER BY population DESC;
```

**Key Points:**
- The `fbi_crime_data_2015` table includes the state, city name, and population for that city
- Next is the number of crimes reported by police in categories, including violent crime, vehicle thefts, and property crime

### Calculating Property Crime Rates

To calculate property crimes per 1,000 people in cities with more than 500,000 people and order them:

```sql
SELECT
    city,
    st,
    population,
    property_crime,
    round(
        (property_crime::numeric / population) * 1000, 1
    ) AS pc_per_1000
FROM fbi_crime_data_2015
WHERE population >= 500000
ORDER BY (property_crime::numeric / population) DESC;
```

**How it works:**
- In Chapter 5, you learned that when dividing an integer by an integer, one of the values must be a numeric or decimal for the result to include decimal places
- We do that in the rate calculation with PostgreSQL's double-colon shorthand
- Because we don't need to see many decimal places, we wrap the statement in the `round()` function to round off the output to the nearest tenth
- Then we give the calculated column an alias of `pc_per_1000` for easy reference

**Results:**
```
city          | st          | population | property_crime | pc_per_1000
--------------|-------------|------------|----------------|------------
Tucson        | Arizona     | 529675     | 35185          | 66.4
San Francisco | California  | 863782     | 53019          | 61.4
Albuquerque   | New Mexico  | 559721     | 33993          | 60.7
Memphis       | Tennessee   | 657936     | 37047          | 56.3
Seattle       | Washington  | 683700     | 37754          | 55.2
--snip--
El Paso       | Texas       | 686077     | 13133          | 19.1
New York      | New York    | 8550861    | 129860         | 15.2
```

**Analysis:**
- Tucson, Arizona, has the highest rate of property crimes, followed by San Francisco, California
- At the bottom is New York City, with a rate that's one-fourth of Tucson's
- If we had compared the cities based solely on the raw numbers of property crimes, we'd have a far different result than the one we derived by calculating the rate per thousand

### Important Caveats

I'd be remiss not to point out that the FBI website at https://ucr.fbi.gov/ucr-statistics-their-proper-use/ discourages creating rankings from its crime data, stating that doing so creates "misleading perceptions which adversely affect geographic entities and their residents." They point out that variations in crimes and crime rates across the country are often due to a number of factors ranging from population density to economic conditions and even the climate. Also, the FBI's crime data has well-documented shortcomings, including incomplete reporting by police agencies.

**Conclusion:** That said, asking why a locality has higher or lower crime rates than others is still worth pursuing, and rates do provide some measure of comparison despite certain limitations.

## Summary

That wraps up our exploration of statistical functions in SQL, rankings, and rates. Now your SQL analysis toolkit includes ways to find relationships among variables using statistics functions, create rankings from ordered data, and properly compare raw numbers by turning them into rates. That toolkit is starting to look impressive!

### Key Concepts Covered

- **Correlation**: Using `corr(Y, X)` to measure relationships between variables
- **Linear regression**: Using `regr_slope(Y, X)` and `regr_intercept(Y, X)` to predict values
- **R-squared**: Using `regr_r2(Y, X)` to measure how much variation is explained
- **Rankings**: Using `rank()` and `dense_rank()` window functions
- **PARTITION BY**: Ranking within subgroups
- **Rates**: Calculating rates per 1,000 for meaningful comparisons

### Best Practices

1. ✅ Understand correlation vs. causality
2. ✅ Use correlation as preliminary analysis, not final conclusion
3. ✅ Consider statistical significance testing
4. ✅ Use `rank()` for most ranking scenarios
5. ✅ Use PARTITION BY for rankings within groups
6. ✅ Calculate rates instead of comparing raw counts
7. ✅ Round correlation and regression values for readability
8. ✅ Be cautious when interpreting statistical results

### Common Patterns

**Correlation:**
```sql
SELECT corr(dependent_var, independent_var) AS correlation
FROM table_name;
```

**Regression:**
```sql
SELECT 
    regr_slope(Y, X) AS slope,
    regr_intercept(Y, X) AS y_intercept,
    regr_r2(Y, X) AS r_squared
FROM table_name;
```

**Ranking:**
```sql
SELECT column, rank() OVER (ORDER BY value_column DESC)
FROM table_name;
```

**Ranking within groups:**
```sql
SELECT category, value, rank() OVER (PARTITION BY category ORDER BY value DESC)
FROM table_name;
```

**Calculating rates:**
```sql
SELECT 
    city,
    round((crimes::numeric / population) * 1000, 1) AS rate_per_1000
FROM table_name
WHERE population >= threshold;
```

### When to Use Each Function

**corr(Y, X):**
- When you want to measure relationship strength
- For preliminary data exploration
- To identify variables worth further analysis

**regr_slope(Y, X) / regr_intercept(Y, X):**
- When you want to predict values
- To understand how much Y changes per unit of X
- For creating regression models

**regr_r2(Y, X):**
- To measure how much variation is explained
- To assess model fit
- To compare different models

**rank() / dense_rank():**
- When you need numbered rankings
- For creating leaderboards
- To track changes over time

**PARTITION BY:**
- When ranking within categories
- For comparing items within groups
- To find top performers by category

**Rates:**
- When comparing populations of different sizes
- To normalize data for fair comparisons
- For meaningful statistical comparisons

## Next Steps

Next, we'll dive deeper into date and time data, using SQL functions to extract the information we need.
