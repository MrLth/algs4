###
 # @Author: mrlthf11
 # @LastEditors: mrlthf11
 # @Date: 2021-09-24 15:38:35
 # @LastEditTime: 2021-09-24 15:38:36
 # @Description: file content
### 
# 获取 Windows 和 WSL2 的 ip
$winip = bash.exe -c "ip route | grep default | awk '{print `$3}'"
$wslip = bash.exe -c "hostname -I | awk '{print `$1}'";
$found1 = $winip -match '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}';
$found2 = $wslip -match '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}';

if( !($found1 -and $found2) ){
  # 如果没找到 wsl 的 ip, 就退出执行
  echo "The Script Exited, the ip address of WSL 2 cannot be found";
  exit;
}

# 你需要映射到局域网中端口
$ports=@(5000,5001);

# 监听的 ip，这么写是可以来自局域网
$addr='0.0.0.0';
# 监听的端口，就是谁来访问自己
$ports_a = $ports -join ",";

# 移除旧的防火墙规则
iex "Remove-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' " | Out-Null

# 允许防火墙规则通过这些端口
iex "New-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' -Direction Outbound -LocalPort $ports_a -Action Allow -Protocol TCP"  | Out-Null
iex "New-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' -Direction Inbound -LocalPort $ports_a -Action Allow -Protocol TCP"  | Out-Null

# 使用 portproxy 让 Windows 转发端口
# https://docs.microsoft.com/en-us/windows-server/networking/technologies/netsh/netsh-interface-portproxy
for( $i = 0; $i -lt $ports.length; $i++ ){
  $port = $ports[$i];
  iex "netsh interface portproxy delete v4tov4 listenport=$port listenaddress=$addr"  | Out-Null
  iex "netsh interface portproxy add v4tov4 listenport=$port listenaddress=$addr connectport=$port connectaddress=$wslip"  | Out-Null
}