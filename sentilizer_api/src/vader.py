import argparse
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import operator

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Vader sentiment analyzer')
    parser.add_argument('-s', action='store', type = str)
    args = parser.parse_args()

    if args.s:
        scores = SentimentIntensityAnalyzer().polarity_scores(args.s)
        del scores['compound']
        sorted_scores = sorted(scores.items(), key=operator.itemgetter(1), reverse=True)
        print(sorted_scores[0][0])