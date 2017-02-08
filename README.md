Data Story

I looked at the flight arrival statistics for several airports in the US and I sampled the airports such that different geography and climate are well represented in the sample.
Considering this dataset includes delay statistics, I wanted to investigate if the proportion of delayed flights have systematically gone up or down over the years. My hypothesis was it would have a downward trend considering improvements in air traffic control and other things. 
In addition, I thought that weather must be the most important contributing factor for flight delays and therefore I investigated the presence of seasonal effects by plotting the monthly data for each year in the dataset.

Design

I started by creating an animation wherein we cycle through the years and plot flight delay and flight volume next to each other. The objective here was to compare the proportion of delayed flights between the years and see if it has any noticeable trend when viewed next to the average number of flight arrivals.
Next, I introduced the dropdown so that any specific year in the dataset can be selected. This would help us focus on any particular year as details might get overlooked when viewing the entire animation.
In order to view seasonal effects as well as address comments about viewing the delay for each of the attributable causes, I introduced the stacked bar chart which included the proportion of delayed flights and the amount of delay for a given month. I introduced a selectbox wherein the user may select any particular month to view the aforementioned artifacts for that period. It should be noted that the dropdown selection is filtered based on the year selection in the top-half of the window.

Reviewer Feedback

Feedback from Julianna B.: 
The first thing I noticed was that the flight delay has stayed fairly consistent for the period between 2003 and 2012 and has started coming down slightly from 2013 onwards. I noticed that the number of flights has been also steadily decreasing from 2007 onwards, this could have resulted in the decrease in the delay in recent years. 
Instead of showing the annual flight volume, consider normalizing the data for each month. That way the numbers will not be affected by the months of data available in the dataset. Secondly, instead of showing the numbers in an absolute scale, consider using a truncated y-axis so that the variation in the data can be seen more easily.

Response: I addressed both. I plotted the number of average monthly flights and truncated the axis such that the differences between the years are clearly visible.

Feedback from Matt H.: 
I liked the animation, although it was slightly too quick to make any mental notes. I was expecting the number of flights to increase with time which is not the case for the airports included in the charts. This was counter-intuitive. The proportion of delayed flights was more or less constant which I thought would shrink over time due to improvements in technology.
Please consider using a scale where the differences in the delay percentages are more visible. Consider stemming the lower limit of y-axis to the minimum delay value seen in the entire dataset. Secondly, a pie chart showing the proportion of the delay by category might also help as it will give a visual representation of the total delay for each of the delay categories.

Response: I ignored the first as in the class it was told that it is typically not recommended to alter the scale in a way that gives the wrong impression of the data. Snapping the minimum delay (~16%) to 0 would have resulted in a visual illusion that would make the highest delay (~38%) look 10 times more instead of twice the size. As for the second comment, I added a stacked bar chart to include the proportion of the delay by category for each month in the dataset. In the class, the instructor said that the human eye fails to judge the data values when expressed in angles (pie-chart) versus length (bar chart).

Feedback from Johan T.: 
I liked the animation. It looks like the number of flights have come down over the years and the number of delayed flights has also shrunk slightly. Maybe the decrease in traffic has helped the reduction in the number of delayed flights. One interesting observation was that while weather gets so much coverage in media for flight delays, this dataset suggests differently. It looks like the aviation system delay is the most dominant factor for the number of delayed flights in US. I noticed that there is a consistent seasonal trend in the data, the proportion of delayed flights is consistently higher for December, January, and February.
Consider using a color palette for the stacked bar charts that is different from red-green as many people have difficulties distinguishing different shades of red and green. Secondly, update the dropdown option's text to something that shows which month's data is unavailable for the dataset being studied. Lastly, add the year to the month in the banner "Detailed statistics for ...".

Response: I changed the color palette to "blue" from "red-green". I updated the dropdown option's text to "No data available for ..." for months of a specific year whose data was not available in the dataset. Lastly, I updated the banner text to "Detailed statistics for  January, 2016" which includes the year.

References

1. https://en.wikipedia.org/wiki/List_of_the_busiest_airports_in_the_United_States Accessed on 1/14/2017.
2. https://bl.ocks.org/mbostock/5577023 Accessed on 01/25/2017.
3. https://github.com/d3/d3-3.x-api-reference/blob/master/Stack-Layout.md Accessed on 01/21/2017.
4. https://bost.ocks.org/mike/constancy/ Accessed on 01/16/2017.
5. https://www.rita.dot.gov/bts/help/aviation/html/understanding.html#q6 Accessed on 01/15/2016


Findings:

For the first section (the 3 plots on the top):
The proportion of delayed flights has been more or less constant across time for Los Angeles, Denver, JFK, and Dallas-Fort Worth. In case of Hartsfield-Jackson Atlanta airport and Chicago O'Hare, the proportion of delayed flights has steadily decreased and is currently at its lowest level for the window of time studied in this exercise.
It should be noted that the proportion of delayed flights has been at its lowest in recent years. But there has been two or three incidents of significant increases in the proportion of delayed flights for all the airports included in this study.
In case of Chicago O'Hare, the decrease in the proportion of delayed flights can be attributed to the decrease in traffic as there is almost 1:1 correspondence between the two metric as exhibited in the two plots above.
For JF Kennedy and Los Angeles Intl airport, the traffic has been fairly consistent over the years and so has the proportion of delayed flight arrivals.
In case of Dallas Fort Worth, there is a steady dip in the number of monthly arrivals but the proportion of delayed flights have been fairly steady.
In case of Hartsfield-Jackson Atlanta airports, the proportion of delayed flights has reduced significantly in recent years which can be attributed to the improvements and renovations that happened between 2001 and 2014 and is well documented on the Wikipedia (https://en.wikipedia.org/wiki/Hartsfield%E2%80%93Jackson_Atlanta_International_Airport) page.
In case of Denver airport, the proportion of delayed traffic has been fairly constant but the average number of monthly arrivals has steadily increased. This has been possible due to the addition of the sixth runway which was commissioned in 2003 (http://www.airport-technology.com/projects/denver/).

For the second section (next 2 plots on the page):
The proportion of delayed flights reach their maximum during the summer and winter seasons. However, when the proportion of delay (time) is taken into account, the summer season proves to be the worst performing season.
The increased proportion of delayed flights and delays during the summer season can be attributed to the higher volume of flight arrivals during the summer season. The summer season had the highest monthly flight arrivals for 12 out of 12 years included in this study.
P.S. > The flight statistics from 2003 and 2016 were ignored when analyzing the seasonal nature of the delay due to lack of data for certain months.

Review Questions and Answers:
Reviewer: There are no comments! Please add them at each logical step in the code so the reader knows what is going on.
AB: Comments added. I hope they are not too wordy or redundant.

Reviewer: how does flight delay change over time?
AB: Addressed in findings and changed chart type.

Reviewer: has that affected delay statistics?
AB: Addressed in findings.

Reviewer: is there a seasonal pattern and is that consistent across the years?
AB: Addressed in findings

Reviewer: are some 'delay types' more prevalent than others?
AB: In the revised design, I am no longer looking at the five different buckets.

Reviewer: explanatory one - see link here for a recap on the difference
AB: Whether it is explanatory or exploratory or yet some other kind - you can decide.

Reviewer: the page is very wide - I work on a Macbook and I had to zoom out several times to see what's going on.
AB: I work on IMac 27, still I have tried to shrink as much as possible.

Reviewer: the animation is a technically accomplished thing but is it the best way of showing change over time? I'm aching to see average flight time arrivals and delay statistics on a time line to see how they've changed over the years and whether there is a correlation?
AB: Please see if the revised chart addresses what you have asked for.

Reviewer: the map looks great but is this the right choice for delay? You could use it as a key to show where the airports are if you have room on the page.
AB: That's what I did in the revised design. 

Reviewer: is black a reader-friendly colour? Something lighter on the eye might be better?
AB: To me, it is. When you review future assignments, please take into consideration some people have very serous color vision impairment. I asked one of my friends to choose the colors and in her opinion, they should be good.

Reviewr: what do ORD, ATL, LAX mean - you need to have the full airport names somewhere to make it more accessible
AB: Please check the tooltip for each airport in the map.

Review: minutes and proportion - it's great that you've shown both proportion (% is always more accessible than ratio) and minutes. Instead of having both charts, you could have a radio button that flicks between them. See an example of the use of the radio button here
AB: It has been addressed in the new design.

Reviewer: You have not outlined your key findings in either. Please make sure they are in BOTH the graphic and the README file before you resubmit.
AB: It has been added in both sections. By the way, the project guidelines did not say that this has to be in the README. The data story can be only 4 sentences. The design can only include design choices that were made. So as I read it, I did not see a placeholder for the findings. SO I created a new one called "Findings".

Reviewer: You haven't included any older files, although you have documented the evolution of the project in your README file. Please make sure you include this file as well as the new version when you resubmit.
AB: I have added the last one as "index_initial.html" and this one is "index.html" as well as "index_final.html"
