#include <bits/stdc++.h>
using namespace std;

long long shreya_helper(vector<int>& arr, vector<long long>& pre, int l, int r, vector<vector<long long>>& dp) {
    // base case
    if (l == r) return 0;
    if (dp[l][r] != -1) return dp[l][r];

    long long ans = LLONG_MAX;

    for (int i = l; i < r; i++) {
        long long part1 = shreya_helper(arr, pre, l, i, dp);
        long long part2 = shreya_helper(arr, pre, i + 1, r, dp);
        
        long long sum_lr = pre[r] - ((l > 0) ? pre[l - 1] : 0);
        long long temp = sum_lr + part1 + part2;

        ans = min(ans, temp);
    }

    return dp[l][r] = ans;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    vector<long long> pre(n);
    
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
        sum += arr[i];
        pre[i] = sum;
    }

    vector<vector<long long>> dp(n, vector<long long>(n, -1));

    long long ans = shreya_helper(arr, pre, 0, n - 1, dp);
    cout << ans << endl;
}
